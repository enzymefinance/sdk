import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

// same address for ethereum and polygon
const UNISWAP_V2_FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" as const;

const pairAbi = {
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
} as const;

const reservesAbi = {
  constant: true,
  inputs: [],
  name: "getReserves",
  outputs: [
    {
      internalType: "uint112",
      name: "reserve0",
      type: "uint112",
    },
    {
      internalType: "uint112",
      name: "reserve1",
      type: "uint112",
    },
    {
      internalType: "uint32",
      name: "blockTimestampLast",
      type: "uint32",
    },
  ],
  payable: false,
  stateMutability: "view",
  type: "function",
} as const;

export async function getUniswapV2PairData(
  client: PublicClient,
  args: ReadContractParameters<{
    token0: Address;
    token1: Address;
  }>,
) {
  const pairAddress = await client.readContract({
    ...readContractParameters(args),
    abi: [pairAbi],
    functionName: "getPair",
    address: UNISWAP_V2_FACTORY,
    args: [args.token0, args.token1],
  });

  const [reserve0, reserve1] = await client.readContract({
    ...readContractParameters(args),
    abi: [reservesAbi],
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
