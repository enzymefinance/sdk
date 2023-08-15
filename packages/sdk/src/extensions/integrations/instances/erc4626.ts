import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const erc4626LendEncoding = [
  {
    type: "address",
    name: "tokenAddress",
  },
  {
    name: "outgoingAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type Erc4626LendArgs = {
  tokenAddress: Address;
  outgoingAmount: bigint;
  minIncomingAmount: bigint;
};

export function encodeErc4626LendArgs({ tokenAddress, outgoingAmount, minIncomingAmount }: Erc4626LendArgs): Hex {
  return encodeAbiParameters(erc4626LendEncoding, [tokenAddress, outgoingAmount, minIncomingAmount]);
}

export function decodeErc4626LendArgs(callArgs: Hex): Erc4626LendArgs {
  const [tokenAddress, outgoingAmount, minIncomingAmount] = decodeAbiParameters(erc4626LendEncoding, callArgs);

  return {
    tokenAddress,
    outgoingAmount,
    minIncomingAmount,
  };
}

export const erc4626RedeemEncoding = [
  {
    type: "address",
    name: "tokenAddress",
  },
  {
    name: "outgoingAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type Erc4626RedeemArgs = {
  tokenAddress: Address;
  outgoingAmount: bigint;
  minIncomingAmount: bigint;
};

export function encodeErc4626RedeemArgs({ tokenAddress, outgoingAmount, minIncomingAmount }: Erc4626RedeemArgs): Hex {
  return encodeAbiParameters(erc4626RedeemEncoding, [tokenAddress, outgoingAmount, minIncomingAmount]);
}

export function decodeErc4626RedeemArgs(integrationData: Hex): Erc4626RedeemArgs {
  const [tokenAddress, outgoingAmount, minIncomingAmount] = decodeAbiParameters(erc4626RedeemEncoding, integrationData);

  return { tokenAddress, outgoingAmount, minIncomingAmount };
}
