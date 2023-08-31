import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const ERC4626LendEncoding = [
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

export type ERC4626LendArgs = {
  tokenAddress: Address;
  outgoingAssetAmount: bigint;
  minIncomingAmount: bigint;
};

export function encodeERC4626LendArgs({ tokenAddress, outgoingAssetAmount, minIncomingAmount }: ERC4626LendArgs): Hex {
  return encodeAbiParameters(ERC4626LendEncoding, [tokenAddress, outgoingAssetAmount, minIncomingAmount]);
}

export function decodeERC4626LendArgs(callArgs: Hex): ERC4626LendArgs {
  const [tokenAddress, outgoingAssetAmount, minIncomingAmount] = decodeAbiParameters(ERC4626LendEncoding, callArgs);

  return {
    tokenAddress,
    outgoingAssetAmount,
    minIncomingAmount,
  };
}

const ERC4626RedeemEncoding = [
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

export type ERC4626RedeemArgs = {
  tokenAddress: Address;
  outgoingAssetAmount: bigint;
  minIncomingAmount: bigint;
};

export function encodeERC4626RedeemArgs({
  tokenAddress,
  outgoingAssetAmount,
  minIncomingAmount,
}: ERC4626RedeemArgs): Hex {
  return encodeAbiParameters(ERC4626RedeemEncoding, [tokenAddress, outgoingAssetAmount, minIncomingAmount]);
}

export function decodeERC4626RedeemArgs(integrationData: Hex): ERC4626RedeemArgs {
  const [tokenAddress, outgoingAssetAmount, minIncomingAmount] = decodeAbiParameters(
    ERC4626RedeemEncoding,
    integrationData,
  );

  return { tokenAddress, outgoingAssetAmount, minIncomingAmount };
}
