import { type Address, parseAbiItem } from "viem";
import { publicClient } from "../client.js";

export function getBalanceOf({
  token,
  account,
}: {
  token: Address;
  account: Address;
}) {
  const abi = parseAbiItem("function balanceOf(address account) view returns (uint256)");

  return publicClient.readContract({
    address: token,
    abi: [abi],
    functionName: "balanceOf",
    args: [account],
  });
}
