import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const yearnVaultV2LendEncoding = [
  {
    type: "address",
    name: "yVault",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
  {
    name: "minIncomingYVaultSharesAmount",
    type: "uint256",
  },
] as const;

export type YearnVaultV2LendArgs = {
  yVault: Address;
  depositAmount: bigint;
  minIncomingYVaultSharesAmount: bigint;
};

export function encodeYearnVaultV2LendArgs({
  yVault,
  depositAmount,
  minIncomingYVaultSharesAmount,
}: YearnVaultV2LendArgs): Hex {
  return encodeAbiParameters(yearnVaultV2LendEncoding, [yVault, depositAmount, minIncomingYVaultSharesAmount]);
}

export function decodeYearnVaultV2LendArgs(callArgs: Hex): YearnVaultV2LendArgs {
  const [yVault, depositAmount, minIncomingYVaultSharesAmount] = decodeAbiParameters(
    yearnVaultV2LendEncoding,
    callArgs,
  );

  return {
    yVault,
    depositAmount,
    minIncomingYVaultSharesAmount,
  };
}

export const yearnVaultV2RedeemEncoding = [
  {
    type: "address",
    name: "yVault",
  },
  {
    name: "maxOutgoingYVaultSharesAmount",
    type: "uint256",
  },
  {
    name: "minIncomingUnderlyingAmount",
    type: "uint256",
  },
  {
    name: "slippageToleranceBps",
    type: "uint256",
  },
] as const;

export type YearnVaultV2RedeemArgs = {
  yVault: Address;
  maxOutgoingYVaultSharesAmount: bigint;
  minIncomingUnderlyingAmount: bigint;
  slippageToleranceBps: bigint;
};

export function encodeYearnVaultV2RedeemArgs({
  yVault,
  maxOutgoingYVaultSharesAmount,
  minIncomingUnderlyingAmount,
  slippageToleranceBps,
}: YearnVaultV2RedeemArgs): Hex {
  return encodeAbiParameters(yearnVaultV2RedeemEncoding, [
    yVault,
    maxOutgoingYVaultSharesAmount,
    minIncomingUnderlyingAmount,
    slippageToleranceBps,
  ]);
}

export function decodeYearnVaultV2RedeemArgs(integrationData: Hex): YearnVaultV2RedeemArgs {
  const [yVault, maxOutgoingYVaultSharesAmount, minIncomingUnderlyingAmount, slippageToleranceBps] =
    decodeAbiParameters(yearnVaultV2RedeemEncoding, integrationData);

  return { yVault, maxOutgoingYVaultSharesAmount, minIncomingUnderlyingAmount, slippageToleranceBps };
}
