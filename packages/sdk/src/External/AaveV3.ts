import { type Address, type PublicClient } from "viem";
import { Viem } from "../Utils.js";

const poolAddressProviderAbi = [
  {
    inputs: [],
    name: "getPool",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

const poolAbi = [
  {
    inputs: [{ internalType: "uint8", name: "id", type: "uint8" }],
    name: "getEModeCategoryData",
    outputs: [
      {
        components: [
          { internalType: "uint16", name: "ltv", type: "uint16" },
          { internalType: "uint16", name: "liquidationThreshold", type: "uint16" },
          { internalType: "uint16", name: "liquidationBonus", type: "uint16" },
          { internalType: "address", name: "priceSource", type: "address" },
          { internalType: "string", name: "label", type: "string" },
        ],
        internalType: "struct DataTypes.EModeCategory",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getPool(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    poolAddressProvider: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: poolAddressProviderAbi,
    functionName: "getPool",
    address: args.poolAddressProvider,
  });
}

export async function getEModeCategoryData(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
    categoryId: number;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: poolAbi,
    functionName: "getEModeCategoryData",
    address: args.pool,
    args: [args.categoryId],
  });
}
