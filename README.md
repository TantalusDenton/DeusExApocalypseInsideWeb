# Apocalypse Inside Web

A React archive for Deus Ex: Apocalypse Inside, featuring the original site's artwork and content alongside pages for the backstory, Sarif Industries, and Codename Nebula.

## Run locally

```powershell
docker compose up --build
```

Open `http://localhost:8080`. To use a different local port, set `APOCALYPSE_PORT` before starting Compose.

## Project structure

- `react-site/` — React application, styles, and media.
- `infrastructure/` — deployment configuration (operational details are intentionally not documented in this public README).
- `.github/workflows/` — automated build, security checks, and delivery.

The legacy WordPress installation and its configuration are not included in this repository or the Docker build context.

## Security

This static site does not provide login, registration, or data-submission features. Dependency and source checks run as part of the automated build.
