import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function isPoolFromFactory(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ poolFactory: Address; pool: Address }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function isPoolFromFactory(address _pool) view returns (bool isFromFactory_)"]),
    functionName: "isPoolFromFactory",
    address: args.poolFactory,
    args: [args.pool],
  });
}
