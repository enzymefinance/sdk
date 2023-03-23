import { createGrpcTransport } from "@bufbuild/connect-node";
import {
  createClient,
  Currency,
  Deployment,
  withTokenAuth,
} from "@enzymefinance/api";
import { GrpcTransportOptions } from "./types.js";

const token = process.env.ENZYME_API_TOKEN;
if (!token) {
  throw new Error("Missing `ENZYME_API_TOKEN` environment variable");
}

const address = process.argv[2];
if (address === undefined || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Expected address, got "${address}"`);
}

const transport = createGrpcTransport(
  withTokenAuth<GrpcTransportOptions>(token, {
    baseUrl: "https://api.enzyme.finance",
    httpVersion: "2",
  })
);

const client = createClient(transport);
const vault = await client.getVault({
  address,
  deployment: Deployment.ETHEREUM,
  currency: Currency.USD,
});

console.dir(vault);
