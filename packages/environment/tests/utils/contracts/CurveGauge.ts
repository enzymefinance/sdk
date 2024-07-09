import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getLpToken(client: PublicClient, args: Viem.ContractCallParameters<{ curveGauge: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function lp_token() view returns (address lp_token)"]),
    functionName: "lp_token",
    address: args.curveGauge,
  });
}
