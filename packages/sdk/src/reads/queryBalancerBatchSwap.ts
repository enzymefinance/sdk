import type { SwapKind } from "../extensions/integrations/instances/balancerV2Liquidity.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, Hex, PublicClient } from "viem";

const abi = [
  {
    inputs: [
      { internalType: "enum IVault.SwapKind", name: "kind", type: "uint8" },
      {
        components: [
          { internalType: "bytes32", name: "poolId", type: "bytes32" },
          { internalType: "uint256", name: "assetInIndex", type: "uint256" },
          { internalType: "uint256", name: "assetOutIndex", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes", name: "userData", type: "bytes" },
        ],
        internalType: "struct IVault.BatchSwapStep[]",
        name: "swaps",
        type: "tuple[]",
      },
      { internalType: "contract IAsset[]", name: "assets", type: "address[]" },
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "bool", name: "fromInternalBalance", type: "bool" },
          { internalType: "address payable", name: "recipient", type: "address" },
          { internalType: "bool", name: "toInternalBalance", type: "bool" },
        ],
        internalType: "struct IVault.FundManagement",
        name: "funds",
        type: "tuple",
      },
    ],
    name: "queryBatchSwap",
    outputs: [{ internalType: "int256[]", name: "", type: "int256[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export async function queryBalancerBatchSwap(
  client: PublicClient,
  args: ReadContractParameters<{
    balancerVault: Address;
    swapKind: SwapKind;
    swaps: {
      poolId: Hex;
      assetInIndex: bigint;
      assetOutIndex: bigint;
      amount: bigint;
      userData: Hex;
    }[];
    assets: Address[];
    funds: {
      sender: Address;
      fromInternalBalance: boolean;
      recipient: Address;
      toInternalBalance: boolean;
    };
  }>,
) {
  const { result: limits } = await client.simulateContract({
    ...readContractParameters(args),
    abi,
    functionName: "queryBatchSwap",
    address: args.balancerVault,
    args: [args.swapKind, args.swaps, args.assets, args.funds],
  });

  return limits;
}
