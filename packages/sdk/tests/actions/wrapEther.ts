import { WETH } from "../constants.js";
import { type Network, sendTestTransaction } from "../globals.js";
import { type Address, parseAbi } from "viem";

export function wrapEther({
  account,
  amount,
  network,
}: {
  account: Address;
  amount: bigint;
  network: Network;
}) {
  sendTestTransaction({
    address: WETH,
    abi: parseAbi(["function deposit() payable"] as const),
    functionName: "deposit",
    value: amount,
    account,
    network,
  });
}
