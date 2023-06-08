# Enzyme API Client

## Summary

- The Enzyme API is a gRPC-based API (see https://grpc.io/).
- We currently provide a Javascript/Typescript client to interact with the API. Other clients (python, go) can be generated.
- The API is currently in alpha mode, i.e. we are actively developing it and we are pushing breaking changes frequently and without notice. Once we come out of alpha mode, we will properly announce and document changes.
- We are very happy to get feedback from all users, either on [Discord](https://discord.com/channels/515208056720719872/1099994775056285716) or also through our support email (support@avantgarde.finance)

## Quick start
- Create an API token in the Enzyme App (https://app.enzyme.finance/account/api-tokens)
- Head over to Buf Studio (online gRPC-API client): (https://studio.buf.build/avantgardefinance/enzyme/enzyme.enzyme.v1)
- Add the target URL: https://api.enzyme.finance/
- Add authorization headers: Key: `Authorization`, Value: `Bearer <Your API token here>`
- Select a method
- Fill in request parameters, e.g. vault address

## API Client
We provide an API client package that can be used in your Javascript/Typescript projects: https://www.npmjs.com/package/@enzymefinance/api
Various examples on how to use the API client are available from our Github repo: https://github.com/enzymefinance/sdk/tree/main/examples

## Documentation
https://buf.build/avantgardefinance/enzyme/docs/main:enzyme.enzyme.v1
