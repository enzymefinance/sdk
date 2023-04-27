import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/contract";

export type GetTokenAllowanceParams = {
  token: Address;
  owner: Address;
  spender: Address;
};

export function getTokenAllowance(client: PublicClient, { token, owner, spender }: GetTokenAllowanceParams) {
  return readContract(client, {
    abi: parseAbi(["function allowance(address, address) view returns (uint256)"]),
    functionName: "allowance",
    address: token,
    args: [owner, spender],
  });
}
