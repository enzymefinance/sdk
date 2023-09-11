import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IUniswapV2PoolPriceFeed } from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";

const pairAbi = [
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
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
];

export async function getUniswapV2SwapRedeemRate(
  client: PublicClient,
  args: ReadContractParameters<{
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
    const [underlyings, underlyingAmounts] = (await client.simulateContract({
      ...readContractParameters(args),
      abi: IUniswapV2PoolPriceFeed,
      functionName: "calcUnderlyingValues",
      address: args.uniswapV2PoolPriceFeedAddress,
      args: [args.poolValue.token, args.poolValue.value],
    })) as unknown as [Address[], bigint[]];

    const token0Expected = underlyings[0] === args.token0 ? underlyingAmounts[0] : underlyingAmounts[1];

    const token1Expected = underlyings[1] === args.token1 ? underlyingAmounts[1] : underlyingAmounts[0];

    return { token0Expected, token1Expected };
  } catch {
    const poolTokensSupply = (await client.readContract({
      abi: pairAbi,
      functionName: "totalSupply",
      address: args.poolValue.token,
    })) as bigint;

    const poolTokenReserves = (await client.readContract({
      abi: pairAbi,
      functionName: "getReserves",
      address: args.poolValue.token,
    })) as { reserve0_: bigint; reserve1_: bigint };

    const [token0Reserve, token1Reserve] = [poolTokenReserves.reserve0_, poolTokenReserves.reserve1_];

    const expectedTokens = [
      (args.poolValue.value * token0Reserve) / poolTokensSupply,
      (args.poolValue.value * token1Reserve) / poolTokensSupply,
    ];

    return { token0Expected: expectedTokens[0], token1Expected: expectedTokens[1] };
  }
}
