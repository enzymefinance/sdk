import { type Address, parseAbiItem } from "viem";
import { sendTestTransaction } from "../client.js";
import { WETH } from "../constants.js";

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
