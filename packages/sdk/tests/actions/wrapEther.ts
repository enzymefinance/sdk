import { WETH } from "../constants.js";
import { type ClientNetwork, sendTestTransaction } from "../globals.js";
import { type Address, parseAbi } from "viem";

export function wrapEther({
  account,
  amount,
  clientNetwork,
}: {
  account: Address;
  amount: bigint;
  clientNetwork: ClientNetwork;
}) {
  sendTestTransaction({
    address: WETH,
    abi: parseAbi(["function deposit() payable"] as const),
    functionName: "deposit",
    value: amount,
    account,
    clientNetwork,
  });
}
