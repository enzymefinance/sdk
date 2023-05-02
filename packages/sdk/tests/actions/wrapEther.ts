import { WETH } from "../constants.js";
import { sendTestTransaction } from "../globals.js";
import { type Address, parseAbiItem } from "viem";

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
