import { type Network, sendTestTransaction } from "../globals.js";
import { type Address, parseAbi } from "viem";

export function transferToken({
  token,
  amount,
  recipient,
  account,
  network,
}: {
  token: Address;
  amount: bigint;
  recipient: Address;
  account: Address;
  network: Network;
}) {
  return sendTestTransaction({
    network,
    address: token,
    abi: parseAbi(["function transfer(address _to, uint256 _value) public returns (bool success)"] as const),
    functionName: "transfer",
    account,
    args: [recipient, amount],
  });
}
