import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/contract";

export type GetAssetAllowanceParams = {
  asset: Address;
  owner: Address;
  spender: Address;
};

export function getAssetAllowance(client: PublicClient, { asset, owner, spender }: GetAssetAllowanceParams) {
  return readContract(client, {
    abi: parseAbi(["function allowance(address, address) view returns (uint256)"] as const),
    functionName: "allowance",
    address: asset,
    args: [owner, spender],
  });
}
