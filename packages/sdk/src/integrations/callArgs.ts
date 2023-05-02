import { type Address, parseAbiParameters } from "abitype";
import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type CallArgsForIntegration = {
  selector: Hex;
  integrationData: Hex;
  adapter: Address;
};

const callArgsForIntegrationAbiParamaters = parseAbiParameters(
  "address adapter, bytes4 selector, bytes integrationData",
);

export function encodeCallArgsForIntegration({ adapter, selector, integrationData }: CallArgsForIntegration): Hex {
  return encodeAbiParameters(callArgsForIntegrationAbiParamaters, [adapter, selector, integrationData]);
}

export function decodeCallArgsForIntegration(params: Hex): CallArgsForIntegration {
  const decoded = decodeAbiParameters(callArgsForIntegrationAbiParamaters, params);

  const [adapter, selector, integrationData] = decoded;

  return {
    adapter,
    selector,
    integrationData,
  };
}
