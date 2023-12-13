import { type Address, type Hex, PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

export const takeOrder = IntegrationManager.makeUse(IntegrationManager.Selector.TakeOrder, takeOrderEncode);

const takeOrderEncoding = [
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

export type TakeOrderArgs = {
  pathAddresses: ReadonlyArray<Address>;
  pathFees: ReadonlyArray<number>;
  outgoingAssetAmount: bigint;
  minIncomingAssetAmount: bigint;
};

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [
    args.pathAddresses,
    args.pathFees,
    args.outgoingAssetAmount,
    args.minIncomingAssetAmount,
  ]);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [pathAddresses, pathFees, outgoingAssetAmount, minIncomingAssetAmount] = decodeAbiParameters(
    takeOrderEncoding,
    encoded,
  );

  return {
    pathAddresses,
    pathFees,
    outgoingAssetAmount,
    minIncomingAssetAmount,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL POSITION
//--------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - UNISWAP V3 POOL
//--------------------------------------------------------------------------------------------

const v3PoolAbi = [
  {
    inputs: [],
    name: "slot0",
    outputs: [
      {
        internalType: "uint160",
        name: "sqrtPriceX96",
        type: "uint160",
      },
      {
        internalType: "int24",
        name: "tick",
        type: "int24",
      },
      {
        internalType: "uint16",
        name: "observationIndex",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "observationCardinality",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "observationCardinalityNext",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "feeProtocol",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "unlocked",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "liquidity",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getSlot0(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
  }>,
) {
  const [
    sqrtPriceX96,
    tick,
    observationIndex,
    observationCardinality,
    observationCardinalityNext,
    feeProtocol,
    unlocked,
  ] = await Viem.readContract(client, args, {
    abi: v3PoolAbi,
    functionName: "slot0",
    address: args.pool,
  });

  return {
    sqrtPriceX96,
    tick,
    observationIndex,
    observationCardinality,
    observationCardinalityNext,
    feeProtocol,
    unlocked,
  };
}

export function getLiquidity(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: v3PoolAbi,
    functionName: "liquidity",
    address: args.pool,
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - NONFUNGIBLE POSITION MANAGER
//--------------------------------------------------------------------------------------------

const nonFungiblePositionManagerAbi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount0Max",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "amount1Max",
            type: "uint128",
          },
        ],
        internalType: "struct INonfungiblePositionManager.CollectParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "collect",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export interface CollectParams {
  tokenId: bigint;
  recipient: Address;
  amount0Max: bigint;
  amount1Max: bigint;
}

export async function getPendingFees(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    nonFungiblePositionManager: Address;
    params: CollectParams;
  }>,
) {
  const {
    result: [pendingFees0, pendingFees1],
  } = await Viem.simulateContract(client, args, {
    abi: nonFungiblePositionManagerAbi,
    functionName: "collect",
    address: args.nonFungiblePositionManager,
    args: [args.params],
  });

  return { pendingFees0, pendingFees1 };
}
