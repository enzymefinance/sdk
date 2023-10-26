import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";

export async function getLastCheckpointIndex(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function getLastCheckpointIndex() view returns (uint256)"]),
    functionName: "getLastCheckpointIndex",
    address: args.lidoWithdrawalsQueue,
  });
}

export async function findCheckpointHints(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
    requestIds: ReadonlyArray<bigint>;
    firstIndex: bigint;
    lastIndex: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi([
      "function findCheckpointHints(uint256[] _requestIds, uint256 _firstIndex, uint256 _lastIndex) view returns (uint256[] hintIds)",
    ]),
    functionName: "findCheckpointHints",
    address: args.lidoWithdrawalsQueue,
    args: [args.requestIds, args.firstIndex, args.lastIndex],
  });
}
