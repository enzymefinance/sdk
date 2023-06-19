import { WETH } from "../constants.js";
import { sendTestTransaction } from "../globals.js";
import { type Address, parseAbi } from "viem";

export function wrapEther({
  account,
  amount,
}: {
  account: Address;
  amount: bigint;
}) {
  sendTestTransaction({
    address: WETH,
    abi: parseAbi(["function deposit() payable"] as const),
    functionName: "deposit",
    value: amount,
    account,
  });
}
