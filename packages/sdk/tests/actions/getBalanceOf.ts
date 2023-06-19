import { publicClient } from "../globals.js";
import { type Address, parseAbi } from "viem";

export function getBalanceOf({
  token,
  account,
}: {
  token: Address;
  account: Address;
}) {
  return publicClient.readContract({
    address: token,
    abi: parseAbi(["function balanceOf(address account) view returns (uint256)"] as const),
    functionName: "balanceOf",
    args: [account],
  });
}
