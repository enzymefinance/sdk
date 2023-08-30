import { type ClientNetwork, sendTestTransaction } from "../globals.js";
import { type Address, parseAbi } from "viem";

export function transferToken({
  token,
  amount,
  recipient,
  account,
  clientNetwork,
}: {
  token: Address;
  amount: bigint;
  recipient: Address;
  account: Address;
  clientNetwork: ClientNetwork;
}) {
  return sendTestTransaction({
    clientNetwork,
    address: token,
    abi: parseAbi(["function transfer(address _to, uint256 _value) public returns (bool success)"] as const),
    functionName: "transfer",
    account,
    args: [recipient, amount],
  });
}
