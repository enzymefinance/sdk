import { min } from "../utils/math.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, type PublicClient, isAddressEqual } from "viem";

const abi = [
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

export async function getUniswapV2LendRate(
  client: PublicClient,
  args: ReadContractParameters<{
    asset: Address;
    amount: bigint;
    poolToken: Address;
  }>,
) {
  const amountADesired = args.amount;

  const [[reserve0, reserve1], token0, poolTokenTotalSupply] = await Promise.all([
    client.readContract({
      ...readContractParameters(args),
      abi: abi,
      functionName: "getReserves",
      address: args.poolToken,
    }),
    client.readContract({
      ...readContractParameters(args),
      abi: abi,
      functionName: "token0",
      address: args.poolToken,
    }),
    client.readContract({
      ...readContractParameters(args),
      abi: abi,
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
      ? min(
          (amountADesired * poolTokenTotalSupply) / tokenAReserve,
          (amountBDesired * poolTokenTotalSupply) / tokenBReserve,
        )
      : undefined;

  return { amountBDesired, expectedPoolTokens };
}
