import { type Address, type PublicClient } from "viem";
import { Viem } from "../Utils.js";

const lidoWithdrawalsQueueAbi = [
  {
    inputs: [],
    name: "getLastCheckpointIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },

  {
    inputs: [
      { internalType: "uint256[]", name: "_requestIds", type: "uint256[]" },
      { internalType: "uint256", name: "_firstIndex", type: "uint256" },
      { internalType: "uint256", name: "_lastIndex", type: "uint256" },
    ],
    name: "findCheckpointHints",
    outputs: [{ internalType: "uint256[]", name: "hintIds", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256[]", name: "_requestIds", type: "uint256[]" }],
    name: "getWithdrawalStatus",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "amountOfStETH", type: "uint256" },
          { internalType: "uint256", name: "amountOfShares", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "bool", name: "isFinalized", type: "bool" },
          { internalType: "bool", name: "isClaimed", type: "bool" },
        ],
        internalType: "struct WithdrawalQueueBase.WithdrawalRequestStatus[]",
        name: "statuses",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getLastCheckpointIndex(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: lidoWithdrawalsQueueAbi,
    functionName: "getLastCheckpointIndex",
    address: args.lidoWithdrawalsQueue,
  });
}

export function findCheckpointHints(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
    requestIds: ReadonlyArray<bigint>;
    firstIndex: bigint;
    lastIndex: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: lidoWithdrawalsQueueAbi,
    functionName: "findCheckpointHints",
    address: args.lidoWithdrawalsQueue,
    args: [args.requestIds, args.firstIndex, args.lastIndex],
  });
}

export async function getWithdrawalStatus(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
    requestIds: ReadonlyArray<bigint>;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: lidoWithdrawalsQueueAbi,
    functionName: "getWithdrawalStatus",
    address: args.lidoWithdrawalsQueue,
    args: [args.requestIds],
  });
}
