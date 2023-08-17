import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const erc4626LendEncoding = [
  {
    name: "tokenAddress",
    type: "address",
  },
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type Erc4626LendArgs = {
  tokenAddress: Address;
  outgoingAssetAmount: bigint;
  minIncomingAmount: bigint;
};

export function encodeErc4626LendArgs({ tokenAddress, outgoingAssetAmount, minIncomingAmount }: Erc4626LendArgs): Hex {
  return encodeAbiParameters(erc4626LendEncoding, [tokenAddress, outgoingAssetAmount, minIncomingAmount]);
}

export function decodeErc4626LendArgs(callArgs: Hex): Erc4626LendArgs {
  const [tokenAddress, outgoingAssetAmount, minIncomingAmount] = decodeAbiParameters(erc4626LendEncoding, callArgs);

  return {
    tokenAddress,
    outgoingAssetAmount,
    minIncomingAmount,
  };
}

export const erc4626RedeemEncoding = [
  {
    name: "tokenAddress",
    type: "address",
  },
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type Erc4626RedeemArgs = {
  tokenAddress: Address;
  outgoingAssetAmount: bigint;
  minIncomingAmount: bigint;
};

export function encodeErc4626RedeemArgs({
  tokenAddress,
  outgoingAssetAmount,
  minIncomingAmount,
}: Erc4626RedeemArgs): Hex {
  return encodeAbiParameters(erc4626RedeemEncoding, [tokenAddress, outgoingAssetAmount, minIncomingAmount]);
}

export function decodeErc4626RedeemArgs(integrationData: Hex): Erc4626RedeemArgs {
  const [tokenAddress, outgoingAssetAmount, minIncomingAmount] = decodeAbiParameters(
    erc4626RedeemEncoding,
    integrationData,
  );

  return { tokenAddress, outgoingAssetAmount, minIncomingAmount };
}
