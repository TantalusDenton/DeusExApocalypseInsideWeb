param(
  [Parameter(Mandatory=$true)][string]$StackName,
  [Parameter(Mandatory=$true)][string]$Region,
  [string]$BucketName = ''
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root 'react-site\dist'
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) { throw 'AWS CLI v2 is required.' }
Push-Location $root
try {
  npm --prefix react-site ci
  npm --prefix react-site run build
  $params = @("ParameterKey=SiteBucketName,ParameterValue=$BucketName")
  aws cloudformation deploy --stack-name $StackName --template-file infrastructure/template.yaml --region $Region --capabilities CAPABILITY_IAM --parameter-overrides $params
  $bucket = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query "Stacks[0].Outputs[?OutputKey=='SiteBucket'].OutputValue" --output text
  $distribution = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text
  aws s3 sync $dist "s3://$bucket" --delete --only-show-errors
  aws s3 sync 'wp-content/uploads' "s3://$bucket/media" --delete --exclude '*' --include '*.jpg' --include '*.jpeg' --include '*.png' --include '*.gif' --include '*.woff' --only-show-errors
  aws cloudfront create-invalidation --distribution-id $distribution --paths '/*' | Out-Null
  aws cloudformation describe-stacks --stack-name $StackName --region $Region --query "Stacks[0].Outputs[?OutputKey=='SiteUrl'].OutputValue" --output text
} finally { Pop-Location }
