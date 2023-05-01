import { sendTestTransaction } from "../globals.js";
import { type Address, parseAbi } from "viem";

export async function transferToken({
  token,
  amount,
  recipient,
  account,
}: {
  token: Address;
  amount: bigint;
  recipient: Address;
  account: Address;
}) {
  return await sendTestTransaction({
    address: token,
    abi: parseAbi(["function transfer(address _to, uint256 _value) public returns (bool success)"]),
    functionName: "transfer",
    account,
    args: [recipient, amount],
  });
}
