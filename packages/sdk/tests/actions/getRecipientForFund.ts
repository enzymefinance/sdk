import { parseAbi, type Address } from "viem";
import { MANAGEMENT_FEE } from "../constants.js";
import { publicClient } from "../globals.js";

export async function getRecipientForFund({
  comptrollerProxy,
}: {
  comptrollerProxy: Address;
}) {
  return await publicClient.readContract({
    address: MANAGEMENT_FEE,
    abi: parseAbi([
      "function getRecipientForFund(address _comptrollerProxy) external view returns (address recipient_)",
    ]),
    functionName: "getRecipientForFund",
    args: [comptrollerProxy],
  });
}
