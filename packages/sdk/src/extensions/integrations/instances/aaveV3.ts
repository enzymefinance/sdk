import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const aaveV3LendEncoding = [
  {
    type: "address",
    name: "aToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
] as const;

export type AaveV3LendArgs = {
  aToken: Address;
  depositAmount: bigint;
};

export function encodeAaveV3LendArgs({ aToken, depositAmount }: AaveV3LendArgs): Hex {
  return encodeAbiParameters(aaveV3LendEncoding, [aToken, depositAmount]);
}

export function decodeAaveV3LendArgs(callArgs: Hex): AaveV3LendArgs {
  const [aToken, depositAmount] = decodeAbiParameters(aaveV3LendEncoding, callArgs);

  return {
    aToken,
    depositAmount,
  };
}

const aaveV3RedeemEncoding = [
  {
    type: "address",
    name: "aToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
] as const;

export type AaveV3RedeemArgs = {
  aToken: Address;
  redeemAmount: bigint;
};

export function encodeAaveV3RedeemArgs({ aToken, redeemAmount }: AaveV3RedeemArgs): Hex {
  return encodeAbiParameters(aaveV3RedeemEncoding, [aToken, redeemAmount]);
}

export function decodeAaveV3RedeemArgs(integrationData: Hex): AaveV3RedeemArgs {
  const [aToken, redeemAmount] = decodeAbiParameters(aaveV3RedeemEncoding, integrationData);

  return { aToken, redeemAmount };
}
