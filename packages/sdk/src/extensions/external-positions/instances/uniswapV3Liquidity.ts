import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type UniswapV3LiquidityAction = typeof UniswapV3LiquidityAction[keyof typeof UniswapV3LiquidityAction];
export const UniswapV3LiquidityAction = {
  Mint: 0n,
  AddLiquidity: 1n,
  RemoveLiquidity: 2n,
  Collect: 3n,
  Purge: 4n,
} as const;

const uniswapV3LiquidityMintArgsEncoding = [
  {
    name: "token0",
    type: "address",
  },
  {
    name: "token1",
    type: "address",
  },
  {
    name: "fee",
    type: "uint24",
  },
  {
    name: "tickLower",
    type: "int24",
  },
  {
    name: "tickUpper",
    type: "int24",
  },
  {
    name: "amount0Desired",
    type: "uint256",
  },
  {
    name: "amount1Desired",
    type: "uint256",
  },
  {
    name: "amount0Min",
    type: "uint256",
  },
  {
    name: "amount1Min",
    type: "uint256",
  },
] as const;

export type UniswapV3LiquidityMintArgs = {
  externalPositionProxy: Address;
  token0: Address;
  token1: Address;
  fee: number;
  tickLower: number;
  tickUpper: number;
  amount0Desired: bigint;
  amount1Desired: bigint;
  amount0Min: bigint;
  amount1Min: bigint;
};

export function encodeUniswapV3LiquidityMintArgs({
  externalPositionProxy,
  token0,
  token1,
  fee,
  tickLower,
  tickUpper,
  amount0Desired,
  amount1Desired,
  amount0Min,
  amount1Min,
}: UniswapV3LiquidityMintArgs): Hex {
  const actionArgs = encodeAbiParameters(uniswapV3LiquidityMintArgsEncoding, [
    token0,
    token1,
    fee,
    tickLower,
    tickUpper,
    amount0Desired,
    amount1Desired,
    amount0Min,
    amount1Min,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: UniswapV3LiquidityAction.Mint,
    actionArgs,
  });
}

export function decodeUniswapV3LiquidityMintArgs(callArgs: Hex): UniswapV3LiquidityMintArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [token0, token1, fee, tickLower, tickUpper, amount0Desired, amount1Desired, amount0Min, amount1Min] =
    decodeAbiParameters(uniswapV3LiquidityMintArgsEncoding, actionArgs);

  return {
    token0,
    token1,
    fee,
    tickLower,
    tickUpper,
    amount0Desired,
    amount1Desired,
    amount0Min,
    amount1Min,
    externalPositionProxy,
  };
}

const uniswapV3LiquidityAddLiquidityArgsEncoding = [
  {
    name: "nftId",
    type: "uint256",
  },
  {
    name: "amount0Desired",
    type: "uint256",
  },
  {
    name: "amount1Desired",
    type: "uint256",
  },
  {
    name: "amount0Min",
    type: "uint256",
  },
  {
    name: "amount1Min",
    type: "uint256",
  },
] as const;

export type UniswapV3LiquidityAddLiquidityArgs = {
  externalPositionProxy: Address;
  nftId: bigint;
  amount0Desired: bigint;
  amount1Desired: bigint;
  amount0Min: bigint;
  amount1Min: bigint;
};

export function encodeUniswapV3LiquidityAddLiquidityArgs({
  externalPositionProxy,
  nftId,
  amount0Desired,
  amount1Desired,
  amount0Min,
  amount1Min,
}: UniswapV3LiquidityAddLiquidityArgs): Hex {
  const actionArgs = encodeAbiParameters(uniswapV3LiquidityAddLiquidityArgsEncoding, [
    nftId,
    amount0Desired,
    amount1Desired,
    amount0Min,
    amount1Min,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: UniswapV3LiquidityAction.AddLiquidity,
    actionArgs,
  });
}

export function decodeUniswapV3LiquidityAddLiquidityArgs(callArgs: Hex): UniswapV3LiquidityAddLiquidityArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [nftId, amount0Desired, amount1Desired, amount0Min, amount1Min] = decodeAbiParameters(
    uniswapV3LiquidityAddLiquidityArgsEncoding,
    actionArgs,
  );

  return {
    nftId,
    amount0Desired,
    amount1Desired,
    amount0Min,
    amount1Min,
    externalPositionProxy,
  };
}

const uniswapV3LiquidityRemoveLiquidityArgsEncoding = [
  {
    name: "nftId",
    type: "uint256",
  },
  {
    name: "liquidity",
    type: "uint256",
  },
  {
    name: "amount0Min",
    type: "uint256",
  },
  {
    name: "amount1Min",
    type: "uint256",
  },
] as const;

export type UniswapV3LiquidityRemoveLiquidityArgs = {
  externalPositionProxy: Address;
  nftId: bigint;
  liquidity: bigint;
  amount0Min: bigint;
  amount1Min: bigint;
};

export function encodeUniswapV3LiquidityRemoveLiquidityArgs({
  externalPositionProxy,
  nftId,
  liquidity,
  amount0Min,
  amount1Min,
}: UniswapV3LiquidityRemoveLiquidityArgs): Hex {
  const actionArgs = encodeAbiParameters(uniswapV3LiquidityRemoveLiquidityArgsEncoding, [
    nftId,
    liquidity,
    amount0Min,
    amount1Min,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: UniswapV3LiquidityAction.RemoveLiquidity,
    actionArgs,
  });
}

export function decodeUniswapV3LiquidityRemoveLiquidityArgs(callArgs: Hex): UniswapV3LiquidityRemoveLiquidityArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [nftId, liquidity, amount0Min, amount1Min] = decodeAbiParameters(
    uniswapV3LiquidityRemoveLiquidityArgsEncoding,
    actionArgs,
  );

  return {
    nftId,
    liquidity,
    amount0Min,
    amount1Min,
    externalPositionProxy,
  };
}

const uniswapV3LiquidityCollectArgsEncoding = [
  {
    name: "nftId",
    type: "uint256",
  },
] as const;

export type UniswapV3LiquidityCollectArgs = {
  externalPositionProxy: Address;
  nftId: bigint;
};

export function encodeUniswapV3LiquidityCollectArgs({
  externalPositionProxy,
  nftId,
}: UniswapV3LiquidityCollectArgs): Hex {
  const actionArgs = encodeAbiParameters(uniswapV3LiquidityCollectArgsEncoding, [nftId]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: UniswapV3LiquidityAction.Collect,
    actionArgs,
  });
}

export function decodeUniswapV3LiquidityCollectArgs(callArgs: Hex): UniswapV3LiquidityCollectArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [nftId] = decodeAbiParameters(uniswapV3LiquidityCollectArgsEncoding, actionArgs);

  return {
    nftId,
    externalPositionProxy,
  };
}

const uniswapV3LiquidityPurgeArgsEncoding = [
  {
    name: "nftId",
    type: "uint256",
  },
  {
    name: "liquidity",
    type: "uint128",
  },
  {
    name: "amount0Min",
    type: "uint256",
  },
  {
    name: "amount1Min",
    type: "uint256",
  },
] as const;

export type UniswapV3LiquidityPurgeArgs = {
  externalPositionProxy: Address;
  nftId: bigint;
  liquidity: bigint;
  amount0Min: bigint;
  amount1Min: bigint;
};

export function encodeUniswapV3LiquidityPurgeArgs({
  externalPositionProxy,
  nftId,
  liquidity,
  amount0Min,
  amount1Min,
}: UniswapV3LiquidityPurgeArgs): Hex {
  const actionArgs = encodeAbiParameters(uniswapV3LiquidityPurgeArgsEncoding, [
    nftId,
    liquidity,
    amount0Min,
    amount1Min,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: UniswapV3LiquidityAction.Purge,
    actionArgs,
  });
}

export function decodeUniswapV3LiquidityPurgeArgs(callArgs: Hex): UniswapV3LiquidityPurgeArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [nftId, liquidity, amount0Min, amount1Min] = decodeAbiParameters(
    uniswapV3LiquidityPurgeArgsEncoding,
    actionArgs,
  );

  return {
    nftId,
    liquidity,
    amount0Min,
    amount1Min,
    externalPositionProxy,
  };
}
