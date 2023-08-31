import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const paraswapV5TakeOrderEncoding = [
  {
    name: "minIncomingAssetAmount",
    type: "uint256",
  },
  {
    name: "expectedIncomingAssetAmount",
    type: "uint256",
  },
  {
    name: "outgoingAsset",
    type: "address",
  },
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "uuid",
    type: "bytes16",
  },
  {
    name: "swapType",
    type: "uint256",
  },
  {
    name: "swapData",
    type: "bytes",
  },
] as const;

export type ParaswapV5TakeOrderArgs = {
  expectedIncomingAssetAmount: bigint;
  minIncomingAssetAmount: bigint;
  outgoingAsset: Address;
  outgoingAssetAmount: bigint;
  swapData: Hex;
  swapType: bigint;
  uuid: Hex;
};

export function encodeParaswapV5TakeOrderArgs({
  expectedIncomingAssetAmount,
  minIncomingAssetAmount,
  outgoingAsset,
  outgoingAssetAmount,
  swapData,
  swapType,
  uuid,
}: ParaswapV5TakeOrderArgs): Hex {
  return encodeAbiParameters(paraswapV5TakeOrderEncoding, [
    minIncomingAssetAmount,
    expectedIncomingAssetAmount,
    outgoingAsset,
    outgoingAssetAmount,
    uuid,
    swapType,
    swapData,
  ]);
}

export function decodeParaswapV5TakeOrderArgs(callArgs: Hex): ParaswapV5TakeOrderArgs {
  const [
    minIncomingAssetAmount,
    expectedIncomingAssetAmount,
    outgoingAsset,
    outgoingAssetAmount,
    uuid,
    swapType,
    swapData,
  ] = decodeAbiParameters(paraswapV5TakeOrderEncoding, callArgs);

  return {
    minIncomingAssetAmount,
    expectedIncomingAssetAmount,
    outgoingAsset,
    outgoingAssetAmount,
    uuid,
    swapType,
    swapData,
  };
}
