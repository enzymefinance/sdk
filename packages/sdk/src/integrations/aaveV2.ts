import { type Address, encodeAbiParameters, parseAbiParameters, decodeAbiParameters } from "viem";
import type { Hex } from "viem";
import { decodeCallArgsForIntegration, encodeCallArgsForIntegration } from "./callArgs.js";
import { LEND_SELECTOR } from "../constants/selectors.js";

const integrationDataForAaveV2LendAbiParamaters = parseAbiParameters("address aToken, uint depositAmount");

export interface IntegrationDataForAaveV2Lend {
  aToken: Address;
  depositAmount: bigint;
}

export function encodeIntegrationDataForAaveV2Lend({ aToken, depositAmount }: IntegrationDataForAaveV2Lend) {
  return encodeAbiParameters(integrationDataForAaveV2LendAbiParamaters, [aToken, depositAmount]);
}

export function decodeIntegrationDataForAaveV2Lend(integrationData: Hex): IntegrationDataForAaveV2Lend {
  const decodedIntegrationData = decodeAbiParameters(integrationDataForAaveV2LendAbiParamaters, integrationData);

  const [aToken, depositAmount] = decodedIntegrationData;

  return { aToken, depositAmount };
}

export interface CallArgsForAaveV2Lend {
  aToken: Address;
  depositAmount: bigint;
  adapter: Address;
}

export function encodeCallArgsForAaveV2Lend({ aToken, adapter, depositAmount }: CallArgsForAaveV2Lend): Hex {
  const integrationData = encodeIntegrationDataForAaveV2Lend({
    aToken,
    depositAmount,
  });

  return encodeCallArgsForIntegration({ adapter, selector: LEND_SELECTOR, integrationData });
}

export function decodeCallArgsForAaveV2Lend(callArgs: Hex): CallArgsForAaveV2Lend {
  const decodedCallArgs = decodeCallArgsForIntegration(callArgs);

  const { adapter, integrationData } = decodedCallArgs;

  const { aToken, depositAmount } = decodeIntegrationDataForAaveV2Lend(integrationData);

  return {
    adapter,
    aToken,
    depositAmount,
  };
}
