import type { Address, PublicClient } from "viem";
import { readContractParameters, type ReadContractParameters } from "../utils/viem.js";

 
const pairAbi = {
  constant: true,
  inputs: [
    { internalType: "address", name: "", type: "address" },
    { internalType: "address", name: "", type: "address" },
  ],
  name: "getPair",
  outputs: [
    { internalType: "address", name: "", type: "address" },
  ],
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
      type: "uint112"
    },
    {
      internalType: "uint112",
      name: "reserve1",
      type: "uint112"
    },
    {
      internalType: "uint32",
      name: "blockTimestampLast",
      type: "uint32"
    }
  ],
  payable: false,
  stateMutability: "view",
  type: "function"
};

const UniswapV2PairDeployerContract = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" as const;

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
    address: UniswapV2PairDeployerContract,
    args: [args.token0, args.token1]
  }) as unknown as Address;
  
  const [reserve0, reserve1] = await client.readContract({
    ...readContractParameters(args),
    abi: [reservesAbi],
    functionName: "getReserves",
    address: pairAddress,
  })as unknown as [bigint, bigint];

  const isToken0Before = args.token0.toLowerCase() < args.token1.toLowerCase();
  const [balance0, balance1] = isToken0Before ? [reserve0, reserve1] : [reserve1, reserve0];

  const mappedPairData: Record<Address, bigint> = {
    [args.token0]: balance0,
    [args.token1]: balance1
  };

  return mappedPairData;
}