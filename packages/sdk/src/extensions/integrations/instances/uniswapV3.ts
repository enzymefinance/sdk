import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const uniswapV3TakeOrderEncoding = [
  {
    name: "pathAddresses",
    type: "address[]",
  },
  {
    name: "pathFees",
    type: "uint24[]",
  },
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAssetAmount",
    type: "uint256",
  },
] as const;

export type UniswapV3TakeOrderArgs = {
  pathAddresses: Address[];
  pathFees: number[];
  outgoingAssetAmount: bigint;
  minIncomingAssetAmount: bigint;
};

export function encodeUniswapV3TakeOrderArgs({
  pathAddresses,
  pathFees,
  outgoingAssetAmount,
  minIncomingAssetAmount,
}: UniswapV3TakeOrderArgs): Hex {
  return encodeAbiParameters(uniswapV3TakeOrderEncoding, [
    pathAddresses,
    pathFees,
    outgoingAssetAmount,
    minIncomingAssetAmount,
  ]);
}

export function decodeUniswapV3TakeOrderArgs(callArgs: Hex): UniswapV3TakeOrderArgs {
  const [pathAddresses, pathFees, outgoingAssetAmount, minIncomingAssetAmount] = decodeAbiParameters(
    uniswapV3TakeOrderEncoding,
    callArgs,
  );

  return {
    pathAddresses: [...pathAddresses],
    pathFees: [...pathFees],
    outgoingAssetAmount,
    minIncomingAssetAmount,
  };
}
