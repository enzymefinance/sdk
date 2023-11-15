import type { Address, PublicClient } from "viem";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// UNISWAP V3 POOL
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
// NONFUNGIBLE POSITION MANAGER
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
