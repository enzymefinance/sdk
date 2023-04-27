import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/contract";

export type GetTokenBalanceParams = {
  token: Address;
  owner: Address;
};

export function getTokenBalance(client: PublicClient, { token, owner }: GetTokenBalanceParams) {
  return readContract(client, {
    abi: parseAbi(["function balanceOf(address) view returns (uint256)"]),
    functionName: "balanceOf",
    address: token,
    args: [owner],
  });
}
