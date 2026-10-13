param(
  [Parameter(Mandatory=$true)][string]$StackName,
  [Parameter(Mandatory=$true)][ValidateSet('staging','production')][string]$EnvironmentName,
  [Parameter(Mandatory=$true)][string]$Region,
  [Parameter(Mandatory=$true)][string]$SiteDomainName,
  [Parameter(Mandatory=$true)][string]$HostedZoneId,
  [switch]$CreateDnsRecords
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root 'react-site\dist'
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) { throw 'AWS CLI v2 is required.' }
Push-Location $root
try {
  npm --prefix react-site ci
  npm --prefix react-site run build
  $createDns = if ($CreateDnsRecords) { 'true' } else { 'false' }
  aws cloudformation deploy --stack-name $StackName --template-file infrastructure/template.yaml --region $Region --capabilities CAPABILITY_NAMED_IAM --parameter-overrides "EnvironmentName=$EnvironmentName" "SiteDomainName=$SiteDomainName" "HostedZoneId=$HostedZoneId" "CreateDnsRecords=$createDns" --no-fail-on-empty-changeset
  $bucket = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query "Stacks[0].Outputs[?OutputKey=='SiteBucket'].OutputValue" --output text
  $distribution = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text
  aws s3 sync $dist "s3://$bucket" --delete --cache-control 'public,max-age=604800' --only-show-errors
  if (Test-Path (Join-Path $dist 'assets')) { aws s3 cp (Join-Path $dist 'assets') "s3://$bucket/assets/" --recursive --cache-control 'public,max-age=31536000,immutable' --only-show-errors }
  if (Test-Path (Join-Path $dist 'media')) { aws s3 cp (Join-Path $dist 'media') "s3://$bucket/media/" --recursive --cache-control 'public,max-age=604800' --only-show-errors }
  aws s3 cp (Join-Path $dist 'index.html') "s3://$bucket/index.html" --cache-control 'no-cache,no-store,must-revalidate' --content-type 'text/html; charset=utf-8' --only-show-errors
  aws cloudfront create-invalidation --distribution-id $distribution --paths '/*' | Out-Null
  aws cloudformation describe-stacks --stack-name $StackName --region $Region --query "Stacks[0].Outputs[?OutputKey=='SiteURL'].OutputValue" --output text
} finally { Pop-Location }
