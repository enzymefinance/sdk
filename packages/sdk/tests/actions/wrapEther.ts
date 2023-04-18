import { type Address, parseAbiItem } from "viem";
import { WETH } from "../constants.js";
import { sendTestTransaction } from "../globals.js";

export async function wrapEther({
  account,
  amount,
}: {
  account: Address;
  amount: bigint;
}) {
  const abi = parseAbiItem("function deposit() payable");

  await sendTestTransaction({
    address: WETH,
    abi: [abi],
    functionName: "deposit",
    value: amount,
    account,
  });
}
