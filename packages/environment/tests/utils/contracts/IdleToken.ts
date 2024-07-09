import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getToken(client: PublicClient, args: Viem.ContractCallParameters<{ idleToken: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function token() view returns (address underlying_)"]),
    functionName: "token",
    address: args.idleToken,
  });
}
