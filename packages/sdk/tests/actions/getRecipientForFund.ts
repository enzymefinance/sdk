import { MANAGEMENT_FEE } from "../constants.js";
import { publicClient } from "../globals.js";
import { type Address, parseAbi } from "viem";

export async function getRecipientForFund({
  comptrollerProxy,
}: {
  comptrollerProxy: Address;
}) {
  const abi = parseAbi([
    "function getRecipientForFund(address _comptrollerProxy) external view returns (address recipient_)",
  ] as const);

  return publicClient.readContract({
    address: MANAGEMENT_FEE,
    abi,
    functionName: "getRecipientForFund",
    args: [comptrollerProxy],
  });
}
