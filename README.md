# Enzyme SDK

Work in progress. Your mileage may vary.

## Prerequisites

- [Node.js](https://www.nodejs.org) (>= v18.3.0)
- [pnpm](https://pnpm.io) (>= 7.30.0)

## Quickstart

First, you need to obtain an api key. Please reach out to us to have your account unlocked for the beta.

```sh
# Install npm dependencies.
pnpm install
```

### Web

For the web example you'll first have to configure the api token in your `.env` file:

Copy the `examples/example-api-web/.env.tpl` file to `examples/example-api-web/.env` and set the api token.

Now, run this command:

```sh
pnpm api:web
```

You should now be able to access http://localhost:3000.

### Node

For the node example, you'll have to set or export the `ENZYME_API_TOKEN` environment variable.

```sh
export ENZYME_API_TOKEN=<YOUR API TOKEN>

# For instance, `pnpm api:node 0x1b83ba4527c837d462d5b78d65a097dabae5ea89`
pnpm api:node <VAULT ADDRESS>
```
