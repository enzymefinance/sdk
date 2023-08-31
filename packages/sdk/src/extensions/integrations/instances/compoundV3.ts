import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const compoundV3LendEncoding = [
  {
    type: "address",
    name: "cToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
] as const;

export type CompoundV3LendArgs = {
  cToken: Address;
  depositAmount: bigint;
};

export function encodeCompoundV3LendArgs({ cToken, depositAmount }: CompoundV3LendArgs): Hex {
  return encodeAbiParameters(compoundV3LendEncoding, [cToken, depositAmount]);
}

export function decodeCompoundV3LendArgs(callArgs: Hex): CompoundV3LendArgs {
  const [cToken, depositAmount] = decodeAbiParameters(compoundV3LendEncoding, callArgs);

  return {
    cToken,
    depositAmount,
  };
}

const compoundV3RedeemEncoding = [
  {
    type: "address",
    name: "cToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
] as const;

export type CompoundV3RedeemArgs = {
  cToken: Address;
  redeemAmount: bigint;
};

export function encodeCompoundV3RedeemArgs({ cToken, redeemAmount }: CompoundV3RedeemArgs): Hex {
  return encodeAbiParameters(compoundV3RedeemEncoding, [cToken, redeemAmount]);
}

export function decodeCompoundV3RedeemArgs(integrationData: Hex): CompoundV3RedeemArgs {
  const [cToken, redeemAmount] = decodeAbiParameters(compoundV3RedeemEncoding, integrationData);

  return { cToken, redeemAmount };
}

const compoundV3ClaimRewardsEncoding = [
  {
    type: "address[]",
    name: "cTokens",
  },
] as const;

export type CompoundV3ClaimRewardsArgs = {
  cTokens: Address[];
};

export function encodeCompoundV3ClaimRewardsArgs({ cTokens }: CompoundV3ClaimRewardsArgs): Hex {
  return encodeAbiParameters(compoundV3ClaimRewardsEncoding, [cTokens]);
}

export function decodeCompoundV3ClaimRewardsArgs(integrationData: Hex): CompoundV3ClaimRewardsArgs {
  const [cTokens] = decodeAbiParameters(compoundV3ClaimRewardsEncoding, integrationData);

  return { cTokens: [...cTokens] };
}
