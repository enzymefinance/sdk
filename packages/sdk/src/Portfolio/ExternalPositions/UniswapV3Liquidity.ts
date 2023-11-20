import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  Mint: 0n,
  AddLiquidity: 1n,
  RemoveLiquidity: 2n,
  Collect: 3n,
  Purge: 4n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// MINT
//--------------------------------------------------------------------------------------------

export const mint = ExternalPositionManager.makeUse(Action.Mint, mintEncode);
export const createAndMint = ExternalPositionManager.makeCreateAndUse(Action.Mint, mintEncode);

const mintEncoding = [
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

export type MintArgs = {
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

export function mintEncode(args: MintArgs): Hex {
  return encodeAbiParameters(mintEncoding, [
    args.token0,
    args.token1,
    args.fee,
    args.tickLower,
    args.tickUpper,
    args.amount0Desired,
    args.amount1Desired,
    args.amount0Min,
    args.amount1Min,
  ]);
}

export function mintDecode(encoded: Hex): MintArgs {
  const [token0, token1, fee, tickLower, tickUpper, amount0Desired, amount1Desired, amount0Min, amount1Min] =
    decodeAbiParameters(mintEncoding, encoded);

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
  };
}

//--------------------------------------------------------------------------------------------
// ADD LIQUIDITY
//--------------------------------------------------------------------------------------------

export const addLiquidity = ExternalPositionManager.makeUse(Action.AddLiquidity, addLiquidityEncode);
export const createAndAddLiquidity = ExternalPositionManager.makeCreateAndUse(Action.AddLiquidity, addLiquidityEncode);

const addLiquidityEncoding = [
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

export type AddLiquidityArgs = {
  nftId: bigint;
  amount0Desired: bigint;
  amount1Desired: bigint;
  amount0Min: bigint;
  amount1Min: bigint;
};

export function addLiquidityEncode(args: AddLiquidityArgs): Hex {
  return encodeAbiParameters(addLiquidityEncoding, [
    args.nftId,
    args.amount0Desired,
    args.amount1Desired,
    args.amount0Min,
    args.amount1Min,
  ]);
}

export function addLiquidityDecode(encoded: Hex): AddLiquidityArgs {
  const [nftId, amount0Desired, amount1Desired, amount0Min, amount1Min] = decodeAbiParameters(
    addLiquidityEncoding,
    encoded,
  );

  return {
    nftId,
    amount0Desired,
    amount1Desired,
    amount0Min,
    amount1Min,
  };
}

//--------------------------------------------------------------------------------------------
// REMOVE LIQUIDITY
//--------------------------------------------------------------------------------------------

export const removeLiquidity = ExternalPositionManager.makeUse(Action.RemoveLiquidity, removeLiquidityEncode);

const removeLiquidityEncoding = [
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

export type RemoveLiquidityArgs = {
  nftId: bigint;
  liquidity: bigint;
  amount0Min: bigint;
  amount1Min: bigint;
};

export function removeLiquidityEncode(args: RemoveLiquidityArgs): Hex {
  return encodeAbiParameters(removeLiquidityEncoding, [args.nftId, args.liquidity, args.amount0Min, args.amount1Min]);
}

export function removeLiquidityDecode(encoded: Hex): RemoveLiquidityArgs {
  const [nftId, liquidity, amount0Min, amount1Min] = decodeAbiParameters(removeLiquidityEncoding, encoded);

  return {
    nftId,
    liquidity,
    amount0Min,
    amount1Min,
  };
}

//--------------------------------------------------------------------------------------------
// COLLECT
//--------------------------------------------------------------------------------------------

export const collect = ExternalPositionManager.makeUse(Action.Collect, collectEncode);

const collectEncoding = [
  {
    name: "nftId",
    type: "uint256",
  },
] as const;

export type CollectArgs = {
  nftId: bigint;
};

export function collectEncode(args: CollectArgs): Hex {
  return encodeAbiParameters(collectEncoding, [args.nftId]);
}

export function collectDecode(encoded: Hex): CollectArgs {
  const [nftId] = decodeAbiParameters(collectEncoding, encoded);

  return {
    nftId,
  };
}

//--------------------------------------------------------------------------------------------
// PURGE
//--------------------------------------------------------------------------------------------

export const purge = ExternalPositionManager.makeUse(Action.Purge, purgeEncode);

const purgeEncoding = [
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

export type PurgeArgs = {
  nftId: bigint;
  liquidity: bigint;
  amount0Min: bigint;
  amount1Min: bigint;
};

export function purgeEncode(args: PurgeArgs): Hex {
  return encodeAbiParameters(purgeEncoding, [args.nftId, args.liquidity, args.amount0Min, args.amount1Min]);
}

export function purgeDecode(encoded: Hex): PurgeArgs {
  const [nftId, liquidity, amount0Min, amount1Min] = decodeAbiParameters(purgeEncoding, encoded);

  return {
    nftId,
    liquidity,
    amount0Min,
    amount1Min,
  };
}
