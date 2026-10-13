param(
  [Parameter(Mandatory=$true)][string]$StackName,
  [Parameter(Mandatory=$true)][ValidateSet('staging','production')][string]$EnvironmentName,
  [Parameter(Mandatory=$true)][string]$Region,
  [Parameter(Mandatory=$true)][string]$SiteDomainName,
  [Parameter(Mandatory=$true)][string]$HostedZoneId,
  [string]$ProfileName = 'default',
  [switch]$CreateDnsRecords
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root 'react-site\dist'
$awsCommand = Get-Command aws.exe -ErrorAction SilentlyContinue
$awsPath = if ($awsCommand) { $awsCommand.Source } else { Join-Path $env:LOCALAPPDATA 'Programs\Amazon\AWSCLIV2\aws.exe' }
if (-not (Test-Path $awsPath)) { throw 'AWS CLI v2 is required.' }

function Invoke-AwsCli([string[]]$Arguments) {
  $result = & $awsPath @Arguments
  if ($LASTEXITCODE -ne 0) { throw "AWS CLI failed (exit $LASTEXITCODE): aws $($Arguments[0]) $($Arguments[1])" }
  return $result
}

Push-Location $root
try {
  npm --prefix react-site ci
  if ($LASTEXITCODE -ne 0) { throw 'npm ci failed.' }
  npm --prefix react-site run build
  if ($LASTEXITCODE -ne 0) { throw 'React production build failed.' }
  $createDns = if ($CreateDnsRecords) { 'true' } else { 'false' }
  Invoke-AwsCli @('cloudformation','deploy','--stack-name',$StackName,'--template-file','infrastructure/template.yaml','--region',$Region,'--profile',$ProfileName,'--capabilities','CAPABILITY_NAMED_IAM','--parameter-overrides',"EnvironmentName=$EnvironmentName","SiteDomainName=$SiteDomainName","HostedZoneId=$HostedZoneId","CreateDnsRecords=$createDns",'--no-fail-on-empty-changeset') | Out-Null
  $bucket = (Invoke-AwsCli @('cloudformation','describe-stacks','--stack-name',$StackName,'--region',$Region,'--profile',$ProfileName,'--query',"Stacks[0].Outputs[?OutputKey=='SiteBucket'].OutputValue | [0]",'--output','text') | Select-Object -Last 1).Trim()
  $distribution = (Invoke-AwsCli @('cloudformation','describe-stacks','--stack-name',$StackName,'--region',$Region,'--profile',$ProfileName,'--query',"Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue | [0]",'--output','text') | Select-Object -Last 1).Trim()
  Invoke-AwsCli @('s3','sync',"$dist\","s3://$bucket/",'--profile',$ProfileName,'--region',$Region,'--delete','--cache-control','public,max-age=604800','--only-show-errors') | Out-Null
  if (Test-Path (Join-Path $dist 'assets')) { Invoke-AwsCli @('s3','cp',(Join-Path $dist 'assets')+'\',"s3://$bucket/assets/",'--profile',$ProfileName,'--region',$Region,'--recursive','--cache-control','public,max-age=31536000,immutable','--only-show-errors') | Out-Null }
  if (Test-Path (Join-Path $dist 'media')) { Invoke-AwsCli @('s3','cp',(Join-Path $dist 'media')+'\',"s3://$bucket/media/",'--profile',$ProfileName,'--region',$Region,'--recursive','--cache-control','public,max-age=604800','--only-show-errors') | Out-Null }
  Invoke-AwsCli @('s3','cp',(Join-Path $dist 'index.html'),"s3://$bucket/index.html",'--profile',$ProfileName,'--region',$Region,'--cache-control','no-cache,no-store,must-revalidate','--content-type','text/html; charset=utf-8','--only-show-errors') | Out-Null
  $invalidation = (Invoke-AwsCli @('cloudfront','create-invalidation','--profile',$ProfileName,'--distribution-id',$distribution,'--paths','/*','--query','Invalidation.Id','--output','text') | Select-Object -Last 1).Trim()
  Invoke-AwsCli @('cloudfront','wait','invalidation-completed','--profile',$ProfileName,'--distribution-id',$distribution,'--id',$invalidation) | Out-Null
  Invoke-AwsCli @('cloudformation','describe-stacks','--stack-name',$StackName,'--region',$Region,'--profile',$ProfileName,'--query',"Stacks[0].Outputs[?OutputKey=='SiteUrl'].Value | [0]",'--output','text')
} finally { Pop-Location }
