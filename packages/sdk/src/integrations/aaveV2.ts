import { type Address, encodeAbiParameters, parseAbiParameters, decodeAbiParameters } from "viem";
import type { Hex } from "viem";
import { decodeCallArgsForIntegration, encodeCallArgsForIntegration } from "./callArgs.js";
import { LEND_SELECTOR, REDEEM_SELECTOR } from "../constants/selectors.js";
import { Integration, IntegrationManagerActionId } from "../enums.js";
import { prepareCallOnExtensionParams } from "../actions/callOnExtension.js";

// lend
const integrationDataForAaveV2LendAbiParamaters = parseAbiParameters("address aToken, uint depositAmount");

export type IntegrationDataForAaveV2Lend = {
  aToken: Address;
  depositAmount: bigint;
};

export function encodeIntegrationDataForAaveV2Lend({ aToken, depositAmount }: IntegrationDataForAaveV2Lend): Hex {
  return encodeAbiParameters(integrationDataForAaveV2LendAbiParamaters, [aToken, depositAmount]);
}

export function decodeIntegrationDataForAaveV2Lend(integrationData: Hex): IntegrationDataForAaveV2Lend {
  const decodedIntegrationData = decodeAbiParameters(integrationDataForAaveV2LendAbiParamaters, integrationData);

  const [aToken, depositAmount] = decodedIntegrationData;

  return { aToken, depositAmount };
}

export type CallArgsForAaveV2Lend = {
  aToken: Address;
  depositAmount: bigint;
  adapter: Address;
};

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

export function prepareCallOnAaveV2LendParams({
  integrationManager,
  callArgs,
}: { integrationManager: Address; callArgs: CallArgsForAaveV2Lend }) {
  return prepareCallOnExtensionParams({
    extension: integrationManager,
    actionId: IntegrationManagerActionId.CallOnIntegration,
    callArgs: encodeCallArgsForAaveV2Lend(callArgs),
  });
}

export type AaveV2LendTrade = {
  type: typeof Integration.AaveV2Lend;
  callArgs: CallArgsForAaveV2Lend;
};

// redeem

const integrationDataForAaveV2RedeemAbiParamaters = parseAbiParameters("address aToken, uint redeemAmount");

export type IntegrationDataForAaveV2Redeem = {
  aToken: Address;
  redeemAmount: bigint;
};

export function encodeIntegrationDataForAaveV2Redeem({ aToken, redeemAmount }: IntegrationDataForAaveV2Redeem): Hex {
  return encodeAbiParameters(integrationDataForAaveV2RedeemAbiParamaters, [aToken, redeemAmount]);
}

export function decodeIntegrationDataForAaveV2Redeem(integrationData: Hex): IntegrationDataForAaveV2Redeem {
  const decodedIntegrationData = decodeAbiParameters(integrationDataForAaveV2RedeemAbiParamaters, integrationData);

  const [aToken, redeemAmount] = decodedIntegrationData;

  return { aToken, redeemAmount };
}

export type CallArgsForAaveV2Redeem = {
  aToken: Address;
  redeemAmount: bigint;
  adapter: Address;
};

export function encodeCallArgsForAaveV2Redeem({ aToken, adapter, redeemAmount }: CallArgsForAaveV2Redeem): Hex {
  const integrationData = encodeIntegrationDataForAaveV2Redeem({
    aToken,
    redeemAmount,
  });

  return encodeCallArgsForIntegration({ adapter, selector: REDEEM_SELECTOR, integrationData });
}

export function decodeCallArgsForAaveV2Redeem(callArgs: Hex): CallArgsForAaveV2Redeem {
  const decodedCallArgs = decodeCallArgsForIntegration(callArgs);

  const { adapter, integrationData } = decodedCallArgs;

  const { aToken, redeemAmount } = decodeIntegrationDataForAaveV2Redeem(integrationData);

  return {
    adapter,
    aToken,
    redeemAmount,
  };
}

export function prepareCallOnAaveV2RedeemParams({
  integrationManager,
  callArgs,
}: { integrationManager: Address; callArgs: CallArgsForAaveV2Redeem }) {
  return prepareCallOnExtensionParams({
    extension: integrationManager,
    actionId: IntegrationManagerActionId.CallOnIntegration,
    callArgs: encodeCallArgsForAaveV2Redeem(callArgs),
  });
}

export type AaveV2RedeemTrade = {
  type: typeof Integration.AaveV2Redeem;
  callArgs: CallArgsForAaveV2Redeem;
};
