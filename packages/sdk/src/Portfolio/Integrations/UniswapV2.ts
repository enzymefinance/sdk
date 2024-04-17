import * as Abis from "@enzymefinance/abis";
import {
  type Address,
  ContractFunctionExecutionError,
  type Hex,
  type PublicClient,
  decodeAbiParameters,
  encodeAbiParameters,
  isAddressEqual,
} from "viem";
import { readContract, simulateContract } from "viem/actions";
import { Assertion, BI, Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

export const takeOrder = IntegrationManager.makeUse(IntegrationManager.Selector.TakeOrder, takeOrderEncode);

const takeOrderEncoding = [
  {
    name: "path",
    type: "address[]",
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
  path: ReadonlyArray<Address>;
  outgoingAssetAmount: bigint;
  minIncomingAssetAmount: bigint;
};

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [args.path, args.outgoingAssetAmount, args.minIncomingAssetAmount]);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [path, outgoingAssetAmount, minIncomingAssetAmount] = decodeAbiParameters(takeOrderEncoding, encoded);

  return {
    path,
    outgoingAssetAmount,
    minIncomingAssetAmount,
  };
}

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = IntegrationManager.makeUse(IntegrationManager.Selector.Lend, lendEncode);

const lendEncoding = [
  {
    name: "outgoingAssets",
    type: "address[2]",
  },
  {
    name: "desiredOutgoingAssetAmounts",
    type: "uint256[2]",
  },
  {
    name: "minOutgoingAssetAmounts",
    type: "uint256[2]",
  },
  {
    name: "minPoolTokenAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  tokenA: Address;
  tokenB: Address;
  amountADesired: bigint;
  amountBDesired: bigint;
  amountAMin: bigint;
  amountBMin: bigint;
  minPoolTokenAmount: bigint;
};

export function lendEncode({
  tokenA,
  tokenB,
  amountADesired,
  amountBDesired,
  amountAMin,
  amountBMin,
  minPoolTokenAmount,
}: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [
    [tokenA, tokenB],
    [amountADesired, amountBDesired],
    [amountAMin, amountBMin],
    minPoolTokenAmount,
  ]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [outgoingAssets, desiredOutgoingAssetAmounts, minOutgoingAssetAmounts, minPoolTokenAmount] =
    decodeAbiParameters(lendEncoding, encoded);

  return {
    tokenA: outgoingAssets[0],
    tokenB: outgoingAssets[1],
    amountADesired: desiredOutgoingAssetAmounts[0],
    amountBDesired: desiredOutgoingAssetAmounts[1],
    amountAMin: minOutgoingAssetAmounts[0],
    amountBMin: minOutgoingAssetAmounts[1],
    minPoolTokenAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

const redeemEncoding = [
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "incomingAssets",
    type: "address[2]",
  },
  {
    name: "minIncomingAssetAmounts",
    type: "uint256[2]",
  },
] as const;

export type RedeemArgs = {
  tokenA: Address;
  tokenB: Address;
  amountAMin: bigint;
  amountBMin: bigint;
  poolTokenAmount: bigint;
};

export function redeemEncode({ tokenA, tokenB, amountAMin, amountBMin, poolTokenAmount }: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [poolTokenAmount, [tokenA, tokenB], [amountAMin, amountBMin]]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [outgoingAssetAmount, incomingAssets, minIncomingAssetAmounts] = decodeAbiParameters(redeemEncoding, encoded);

  return {
    tokenA: incomingAssets[0],
    tokenB: incomingAssets[1],
    amountAMin: minIncomingAssetAmounts[0],
    amountBMin: minIncomingAssetAmounts[1],
    poolTokenAmount: outgoingAssetAmount,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

// same address for ethereum and polygon
const UNISWAP_V2_FACTORY = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f" as const;

const uniswapV2PoolAbi = [
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint112", name: "_reserve0", type: "uint112" },
      { internalType: "uint112", name: "_reserve1", type: "uint112" },
      { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },

  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
] as const;

const uniswapV2FactoryAbi = [
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "getPair",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getLendRate(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    asset: Address;
    amount: bigint;
    poolToken: Address;
  }>,
) {
  const amountADesired = args.amount;

  const [[reserve0, reserve1], token0, poolTokenTotalSupply] = await Promise.all([
    readContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: uniswapV2PoolAbi,
      functionName: "getReserves",
      address: args.poolToken,
    }),
    readContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: uniswapV2PoolAbi,
      functionName: "token0",
      address: args.poolToken,
    }),
    readContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: uniswapV2PoolAbi,
      functionName: "totalSupply",
      address: args.poolToken,
    }),
  ]);

  const [tokenAReserve, tokenBReserve] = isAddressEqual(token0, args.asset)
    ? [reserve0, reserve1]
    : [reserve1, reserve0];

  const amountBDesired = tokenAReserve !== 0n ? (amountADesired * tokenBReserve) / tokenAReserve : undefined;

  const expectedPoolTokens =
    tokenAReserve !== 0n && tokenBReserve !== 0n && amountBDesired
      ? BI.min(
          (amountADesired * poolTokenTotalSupply) / tokenAReserve,
          (amountBDesired * poolTokenTotalSupply) / tokenBReserve,
        )
      : undefined;

  return { amountBDesired, expectedPoolTokens };
}

export async function getPairData(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    token0: Address;
    token1: Address;
  }>,
) {
  const pairAddress = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: uniswapV2FactoryAbi,
    functionName: "getPair",
    address: UNISWAP_V2_FACTORY,
    args: [args.token0, args.token1],
  });

  const [reserve0, reserve1] = await client.readContract({
    abi: uniswapV2PoolAbi,
    functionName: "getReserves",
    address: pairAddress,
  });

  const isToken0Before = args.token0.toLowerCase() < args.token1.toLowerCase();
  const [balance0, balance1] = isToken0Before ? [reserve0, reserve1] : [reserve1, reserve0];
  const [token0, token1] = isToken0Before ? [args.token0, args.token1] : [args.token1, args.token0];

  return {
    token0,
    token1,
    reserve0: balance0,
    reserve1: balance1,
    pairAddress,
  };
}

export async function getSwapRedeemRate(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    poolValue: {
      token: Address;
      value: bigint;
    };
    uniswapV2PoolPriceFeedAddress: Address;
    token0: Address;
    token1: Address;
  }>,
) {
  try {
    // The UniswapV2PoolPriceFeed should produce results if all assets are in the universe,
    // but otherwise it will fail.
    const {
      result: [underlyings, underlyingAmounts],
    } = await simulateContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: Abis.IUniswapV2PoolPriceFeed,
      functionName: "calcUnderlyingValues",
      address: args.uniswapV2PoolPriceFeedAddress,
      args: [args.poolValue.token, args.poolValue.value],
    });

    Assertion.invariant(underlyings[0] !== undefined, "underlying is undefined");
    Assertion.invariant(underlyings[1] !== undefined, "underlying is undefined");

    const token0Expected = isAddressEqual(underlyings[0], args.token0) ? underlyingAmounts[0] : underlyingAmounts[1];
    const token1Expected = isAddressEqual(underlyings[1], args.token1) ? underlyingAmounts[1] : underlyingAmounts[0];

    return { token0Expected, token1Expected };
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      const [poolTokensSupply, [reserve0, reserve1]] = await Promise.all([
        client.readContract({
          abi: uniswapV2PoolAbi,
          functionName: "totalSupply",
          address: args.poolValue.token,
        }),
        client.readContract({
          abi: uniswapV2PoolAbi,
          functionName: "getReserves",
          address: args.poolValue.token,
        }),
      ]);

      const token0Expected = (args.poolValue.value * reserve0) / poolTokensSupply;
      const token1Expected = (args.poolValue.value * reserve1) / poolTokensSupply;

      return { token0Expected, token1Expected };
    }
    throw error;
  }
}
