import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getAsset(client: PublicClient, args: Viem.ContractCallParameters<{ erc4626Token: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function asset() view returns (address asset_)"]),
    functionName: "asset",
    address: args.erc4626Token,
  });
}
