# k6 Example

## Install k6

```bash
brew install k6
```

## Usage

### Run Web App

```bash
docker run --rm -it -p 3333:3333 ghcr.io/grafana/quickpizza-local:latest
```

#### Run Test

```bash
set -a && source .env && set +a && k6 run script.js
```
