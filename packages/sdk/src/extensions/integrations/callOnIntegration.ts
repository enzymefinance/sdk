import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const callOnIntegrationArgsEncoding = [
  {
    type: "address",
    name: "adapter",
  },
  {
    type: "bytes4",
    name: "selector",
  },
  {
    type: "bytes",
    name: "integrationData",
  },
] as const;

export type CallOnIntegrationArgs = {
  selector: Hex;
  integrationData: Hex;
  adapter: Address;
};

export function encodeCallOnIntegrationArgs({ adapter, selector, integrationData }: CallOnIntegrationArgs): Hex {
  return encodeAbiParameters(callOnIntegrationArgsEncoding, [adapter, selector, integrationData]);
}

export function decodeCallOnIntegrationArgs(params: Hex): CallOnIntegrationArgs {
  const [adapter, selector, integrationData] = decodeAbiParameters(callOnIntegrationArgsEncoding, params);

  return {
    adapter,
    selector,
    integrationData,
  };
}
