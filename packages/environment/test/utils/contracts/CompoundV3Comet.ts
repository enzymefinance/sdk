import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getBaseToken(client: PublicClient, args: Viem.ContractCallParameters<{ compoundV3Comet: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function baseToken() view returns (address baseToken_)"]),
    functionName: "baseToken",
    address: args.compoundV3Comet,
  });
}
