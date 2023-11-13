import { Address, PublicClient, parseAbi } from "viem";
import { Viem } from "../../Utils.js";

export async function pricePerShare(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    yearnVault: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function pricePerShare() view returns (uint256 price_)"]),
    functionName: "pricePerShare",
    address: args.yearnVault,
  });
}
