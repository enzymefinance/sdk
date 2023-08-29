import { type Address, parseAbi } from "viem";
import { publicClientMainnet } from "../globals.js";

export function getBalanceOf({
  token,
  account,
}: {
  token: Address;
  account: Address;
}) {
  return publicClientMainnet.readContract({
    address: token,
    abi: parseAbi(["function balanceOf(address account) view returns (uint256)"] as const),
    functionName: "balanceOf",
    args: [account],
  });
}
