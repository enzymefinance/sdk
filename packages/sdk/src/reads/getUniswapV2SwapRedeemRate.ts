import { invariant } from "../utils/assertions.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IUniswapV2PoolPriceFeed } from "@enzymefinance/abis";
import { type Address, type PublicClient, isAddressEqual } from "viem";

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
] as const;

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
    const {
      result: [underlyings, underlyingAmounts],
    } = await client.simulateContract({
      ...readContractParameters(args),
      abi: IUniswapV2PoolPriceFeed,
      functionName: "calcUnderlyingValues",
      address: args.uniswapV2PoolPriceFeedAddress,
      args: [args.poolValue.token, args.poolValue.value],
    });

    invariant(underlyings[0] !== undefined, "underlying is undefined");
    invariant(underlyings[1] !== undefined, "underlying is undefined");

    const token0Expected = isAddressEqual(underlyings[0], args.token0) ? underlyingAmounts[0] : underlyingAmounts[1];
    const token1Expected = isAddressEqual(underlyings[1], args.token1) ? underlyingAmounts[1] : underlyingAmounts[0];

    return { token0Expected, token1Expected };
  } catch {
    const [poolTokensSupply, [reserve0, reserve1]] = await Promise.all([
      client.readContract({
        abi: pairAbi,
        functionName: "totalSupply",
        address: args.poolValue.token,
      }),
      client.readContract({
        abi: pairAbi,
        functionName: "getReserves",
        address: args.poolValue.token,
      }),
    ]);

    const token0Expected = (args.poolValue.value * reserve0) / poolTokensSupply;
    const token1Expected = (args.poolValue.value * reserve1) / poolTokensSupply;

    return { token0Expected, token1Expected };
  }
}
