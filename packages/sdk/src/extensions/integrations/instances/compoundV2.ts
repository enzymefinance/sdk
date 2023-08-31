import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const compoundV2LendEncoding = [
  {
    type: "address",
    name: "cToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
  {
    name: "minCTokenAmount",
    type: "uint256",
  },
] as const;

export type CompoundV2LendArgs = {
  cToken: Address;
  depositAmount: bigint;
  minCTokenAmount: bigint;
};

export function encodeCompoundV2LendArgs({ cToken, depositAmount, minCTokenAmount }: CompoundV2LendArgs): Hex {
  return encodeAbiParameters(compoundV2LendEncoding, [cToken, depositAmount, minCTokenAmount]);
}

export function decodeCompoundV2LendArgs(callArgs: Hex): CompoundV2LendArgs {
  const [cToken, depositAmount, minCTokenAmount] = decodeAbiParameters(compoundV2LendEncoding, callArgs);

  return {
    cToken,
    depositAmount,
    minCTokenAmount,
  };
}

const compoundV2RedeemEncoding = [
  {
    type: "address",
    name: "cToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
  {
    name: "minUnderlyingAmount",
    type: "uint256",
  },
] as const;

export type CompoundV2RedeemArgs = {
  cToken: Address;
  redeemAmount: bigint;
  minUnderlyingAmount: bigint;
};

export function encodeCompoundV2RedeemArgs({ cToken, redeemAmount, minUnderlyingAmount }: CompoundV2RedeemArgs): Hex {
  return encodeAbiParameters(compoundV2RedeemEncoding, [cToken, redeemAmount, minUnderlyingAmount]);
}

export function decodeCompoundV2RedeemArgs(integrationData: Hex): CompoundV2RedeemArgs {
  const [cToken, redeemAmount, minUnderlyingAmount] = decodeAbiParameters(compoundV2RedeemEncoding, integrationData);

  return { cToken, redeemAmount, minUnderlyingAmount };
}
