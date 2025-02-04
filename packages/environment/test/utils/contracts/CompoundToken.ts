import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getUnderlying(client: PublicClient, args: Viem.ContractCallParameters<{ compoundToken: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function underlying() view returns (address underlying_)"]),
    functionName: "underlying",
    address: args.compoundToken,
  });
}
