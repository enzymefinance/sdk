import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

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
};

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
};

type Token = {
  chainId: number;
  address: Address;
  decimals: number;
  symbol?: string;
  name?: string;
};

const UniswapV2PairDeployerContract = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" as const;

export async function getUniswapV2PairData(
  client: PublicClient,
  args: ReadContractParameters<{
    token0: Token;
    token1: Token;
  }>,
) {
  const pairAddress = (await client.readContract({
    ...readContractParameters(args),
    abi: [pairAbi],
    functionName: "getPair",
    address: UniswapV2PairDeployerContract,
    args: [args.token0.address, args.token1.address],
  })) as unknown as Address;

  const [reserve0, reserve1] = (await client.readContract({
    ...readContractParameters(args),
    abi: [reservesAbi],
    functionName: "getReserves",
    address: pairAddress,
  })) as unknown as [bigint, bigint];

  const isToken0Before = args.token0.address.toLowerCase() < args.token1.address.toLowerCase();
  const [balance0, balance1] = isToken0Before ? [reserve0, reserve1] : [reserve1, reserve0];

  const mappedPairData = {
    token0: args.token0,
    token1: args.token1,
    reserve0: balance0,
    reserve1: balance1,
    pairAddress,
  };

  return mappedPairData;
}
