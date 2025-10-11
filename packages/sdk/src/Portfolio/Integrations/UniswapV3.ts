import { type Address, type Client, type Hex, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract, simulateContract } from "viem/actions";
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

export type Action = (typeof Action)[keyof typeof Action];
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
  client: Client,
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
  ] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
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
  client: Client,
  args: Viem.ContractCallParameters<{
    pool: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
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
      { internalType: "address", name: "_factory", type: "address" },
      { internalType: "address", name: "_WETH9", type: "address" },
      { internalType: "address", name: "_tokenDescriptor_", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "approved", type: "address" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "operator", type: "address" },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    name: "Collect",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "uint128", name: "liquidity", type: "uint128" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    name: "DecreaseLiquidity",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "uint128", name: "liquidity", type: "uint128" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    name: "IncreaseLiquidity",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH9",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "amount0Max", type: "uint128" },
          { internalType: "uint128", name: "amount1Max", type: "uint128" },
        ],
        internalType: "struct INonfungiblePositionManager.CollectParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "collect",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token0", type: "address" },
      { internalType: "address", name: "token1", type: "address" },
      { internalType: "uint24", name: "fee", type: "uint24" },
      { internalType: "uint160", name: "sqrtPriceX96", type: "uint160" },
    ],
    name: "createAndInitializePoolIfNecessary",
    outputs: [{ internalType: "address", name: "pool", type: "address" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint128", name: "liquidity", type: "uint128" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        internalType: "struct INonfungiblePositionManager.DecreaseLiquidityParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "decreaseLiquidity",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount0Desired", type: "uint256" },
          { internalType: "uint256", name: "amount1Desired", type: "uint256" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        internalType: "struct INonfungiblePositionManager.IncreaseLiquidityParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "increaseLiquidity",
    outputs: [
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "token0", type: "address" },
          { internalType: "address", name: "token1", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "int24", name: "tickLower", type: "int24" },
          { internalType: "int24", name: "tickUpper", type: "int24" },
          { internalType: "uint256", name: "amount0Desired", type: "uint256" },
          { internalType: "uint256", name: "amount1Desired", type: "uint256" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        internalType: "struct INonfungiblePositionManager.MintParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "mint",
    outputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "positions",
    outputs: [
      { internalType: "uint96", name: "nonce", type: "uint96" },
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "address", name: "token0", type: "address" },
      { internalType: "address", name: "token1", type: "address" },
      { internalType: "uint24", name: "fee", type: "uint24" },
      { internalType: "int24", name: "tickLower", type: "int24" },
      { internalType: "int24", name: "tickUpper", type: "int24" },
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint256", name: "feeGrowthInside0LastX128", type: "uint256" },
      { internalType: "uint256", name: "feeGrowthInside1LastX128", type: "uint256" },
      { internalType: "uint128", name: "tokensOwed0", type: "uint128" },
      { internalType: "uint128", name: "tokensOwed1", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "refundETH", outputs: [], stateMutability: "payable", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "selfPermit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "selfPermitAllowed",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "selfPermitAllowedIfNecessary",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "selfPermitIfNecessary",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount0Owed", type: "uint256" },
      { internalType: "uint256", name: "amount1Owed", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "uniswapV3MintCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
] as const;

export interface CollectParams {
  tokenId: bigint;
  recipient: Address;
  amount0Max: bigint;
  amount1Max: bigint;
}

export async function getPendingFees(
  client: Client,
  args: Viem.ContractCallParameters<{
    nonFungiblePositionManager: Address;
    params: CollectParams;
  }>,
) {
  const {
    result: [pendingFees0, pendingFees1],
  } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: nonFungiblePositionManagerAbi,
    functionName: "collect",
    address: args.nonFungiblePositionManager,
    args: [
      {
        amount0Max: args.params.amount0Max,
        amount1Max: args.params.amount1Max,
        recipient: args.params.recipient,
        tokenId: args.params.tokenId,
      },
    ],
  });

  return { pendingFees0, pendingFees1 };
}

export async function getPositions(
  client: Client,
  args: Viem.ContractCallParameters<{
    nonFungiblePositionManager: Address;
    tokenId: bigint;
  }>,
) {
  const [
    nonce,
    operator,
    token0,
    token1,
    fee,
    tickLower,
    tickUpper,
    liquidity,
    feeGrowthInside0LastX128,
    feeGrowthInside1LastX128,
    tokensOwed0,
    tokensOwed1,
  ] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: nonFungiblePositionManagerAbi,
    functionName: "positions",
    address: args.nonFungiblePositionManager,
    args: [args.tokenId],
  });

  return {
    nonce,
    operator,
    token0,
    token1,
    fee,
    tickLower,
    tickUpper,
    liquidity,
    feeGrowthInside0LastX128,
    feeGrowthInside1LastX128,
    tokensOwed0,
    tokensOwed1,
  };
}

export function getPool(
  client: Client,
  args: Viem.ContractCallParameters<{
    factory: Address;
    tokenA: Address;
    tokenB: Address;
    fee: number;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getPool(address,address,uint24) view returns (address)"]),
    functionName: "getPool",
    address: args.factory,
    args: [args.tokenA, args.tokenB, args.fee],
  });
}
