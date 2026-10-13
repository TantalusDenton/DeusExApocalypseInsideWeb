# Apocalypse Inside Web

React archive for Deus Ex: Apocalypse Inside, including the backstory, Sarif Industries, and Codename Nebula pages.

## Local development

```powershell
docker compose up --build
```

The site is available at `http://localhost:8080`. To choose another local port, set `APOCALYPSE_PORT` before starting Compose. The production image is a static build served by the unprivileged Nginx image.

The Git repository contains only the React site, its referenced artwork, infrastructure, and deployment configuration. The legacy WordPress installation and `wp-config.php` remain local and are excluded from Git and Docker build contexts.

## AWS architecture

CloudFormation provisions one isolated stack per environment in `us-east-1`:

| Environment | Hostname | Stack |
| --- | --- | --- |
| Staging | `staging.apocalypseinsi.de` | `apocalypse-inside-staging` |
| Production | `apocalypseinsi.de` | `apocalypse-inside-production` |

Each stack uses a private, encrypted, versioned S3 bucket, CloudFront Origin Access Control, a Route 53 alias, an ACM DNS-validated certificate, security response headers, and a private IAM-invoked health Lambda. The S3 bucket and health logs are retained when a stack is removed. The Lambda has no Function URL or API endpoint.

CloudFront viewer certificates must be created in `us-east-1`. The Route 53 hosted-zone ID is supplied by the deployment environment (`Z1GO58CUQU667P`).

## GitHub Actions delivery

`.github/workflows/site.yml` builds and audits pull requests and `main`, scans source and infrastructure, and creates one verified static artifact. Merges to `main` deploy staging first. Production then waits for approval in the GitHub `production` environment and deploys that same artifact. The environment must restrict deployments to `main` and require the repository owner as reviewer.

GitHub Actions uses short-lived AWS credentials through OIDC. The IAM bootstrap template gives staging and production separate deployment roles and CloudFormation service roles. The trust policy is restricted to this repository's immutable GitHub owner/repository IDs and matching deployment environment claims.

Set the following variables on both GitHub environments:

| Variable | Staging value | Production value |
| --- | --- | --- |
| `AWS_ROLE_ARN` | `StagingDeployRoleArn` output | `ProductionDeployRoleArn` output |
| `AWS_CFN_EXECUTION_ROLE_ARN` | `StagingCloudFormationRoleArn` output | `ProductionCloudFormationRoleArn` output |
| `AWS_REGION` | `us-east-1` | `us-east-1` |
| `AWS_HOSTED_ZONE_ID` | `Z1GO58CUQU667P` | `Z1GO58CUQU667P` |

Also set repository variable `AWS_DEPLOY_ENABLED=true` only after both site stacks exist and each distribution, origin access control, and response headers policy ID has been added to the OIDC bootstrap stack. Before that, CI still runs while deployment jobs are skipped.

### Initial AWS setup

Use an AWS CLI identity with permission to create these CloudFormation and IAM resources. Verify the caller identity first; do not put credentials in repository files, workflow variables, or this directory. Deploy in `us-east-1`.

1. Create GitHub `staging` and `production` environments. Restrict both to branch `main`; require the repository owner to approve `production` deployments.
2. Check whether `token.actions.githubusercontent.com` is already an IAM OIDC provider. Deploy `infrastructure/github-oidc.yaml` as stack `apocalypse-inside-github-oidc`, passing `CreateOidcProvider=false` only if the provider already exists. Use `CAPABILITY_NAMED_IAM`.
3. Deploy `infrastructure/template.yaml` as the staging stack with `EnvironmentName=staging`, `SiteDomainName=staging.apocalypseinsi.de`, `HostedZoneId=Z1GO58CUQU667P`, and `CreateDnsRecords=true`.
4. Deploy the production stack with `EnvironmentName=production`, `SiteDomainName=apocalypseinsi.de`, the same hosted-zone ID, and `CreateDnsRecords=false`. This provisions and validates the distribution without replacing the current apex record.
5. Build with `npm ci` and `npm run build` in `react-site`. Upload `react-site/dist` to each bucket, set `/index.html` to `no-cache`, invalidate each CloudFront distribution, and smoke-test all four routes. Test production through its CloudFront hostname with `apocalypseinsi.de` as the HTTPS host name while the existing apex DNS record remains in place.
6. Update the OIDC bootstrap stack's `StagingDistributionId`, `StagingOriginAccessControlId`, `StagingResponseHeadersPolicyId`, `ProductionDistributionId`, `ProductionOriginAccessControlId`, and `ProductionResponseHeadersPolicyId` parameters from the site stacks' outputs. This scopes each environment's CloudFront updates and cache invalidations to its own resources.
7. Add the four variables above to both GitHub environments, verify production approval rules, then set repository variable `AWS_DEPLOY_ENABLED=true` and push the deployment configuration to `main`.
8. Confirm the staging job and public HTTPS checks succeed. Approve the production job in GitHub to set the production Route 53 A/AAAA aliases to CloudFront. If production verification fails, restore the previous apex A-record target from the Route 53 change history or saved record set.

`aws cloudformation deploy` should be run with the environment's CloudFormation role ARN and `CAPABILITY_NAMED_IAM`. The first production stack creation must keep `CreateDnsRecords=false`; the approved production workflow turns it on after staging is healthy.

## Security checks

CI runs `npm audit`, CodeQL, Gitleaks, `cfn-lint`, and pinned CloudFormation Guard rules before uploading an artifact. GitHub Actions are pinned to commit SHAs. No login, registration, or data-submission endpoint is part of this static site.
