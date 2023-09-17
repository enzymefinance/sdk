import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

const abi = {
  inputs: [{ internalType: "address", name: "", type: "address" }],
  name: "idleSpeeds",
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export function getIdleSpeeds(
  client: PublicClient,
  args: ReadContractParameters<{
    idleController: Address;
    idlePool: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: [abi],
    functionName: "idleSpeeds",
    address: args.idleController,
    args: [args.idlePool],
  });
}
