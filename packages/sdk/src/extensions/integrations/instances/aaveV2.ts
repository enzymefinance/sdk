import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const aaveV2LendEncoding = [
  {
    type: "address",
    name: "aToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
] as const;

export type AaveV2LendArgs = {
  aToken: Address;
  depositAmount: bigint;
};

export function encodeAaveV2LendArgs({ aToken, depositAmount }: AaveV2LendArgs): Hex {
  return encodeAbiParameters(aaveV2LendEncoding, [aToken, depositAmount]);
}

export function decodeAaveV2LendArgs(callArgs: Hex): AaveV2LendArgs {
  const [aToken, depositAmount] = decodeAbiParameters(aaveV2LendEncoding, callArgs);

  return {
    aToken,
    depositAmount,
  };
}
export const aaveV2RedeemEncoding = [
  {
    type: "address",
    name: "aToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
] as const;

export type AaveV2RedeemArgs = {
  aToken: Address;
  redeemAmount: bigint;
};

export function encodeAaveV2RedeemArgs({ aToken, redeemAmount }: AaveV2RedeemArgs): Hex {
  return encodeAbiParameters(aaveV2RedeemEncoding, [aToken, redeemAmount]);
}

export function decodeAaveV2RedeemArgs(integrationData: Hex): AaveV2RedeemArgs {
  const [aToken, redeemAmount] = decodeAbiParameters(aaveV2RedeemEncoding, integrationData);

  return { aToken, redeemAmount };
}
