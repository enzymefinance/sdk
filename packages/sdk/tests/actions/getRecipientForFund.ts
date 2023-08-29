import { type Address, parseAbi } from "viem";
import { MANAGEMENT_FEE } from "../constants.js";
import { publicClientMainnet } from "../globals.js";

export async function getRecipientForFund({
  comptrollerProxy,
}: {
  comptrollerProxy: Address;
}) {
  const abi = parseAbi([
    "function getRecipientForFund(address _comptrollerProxy) external view returns (address recipient_)",
  ] as const);

  return publicClientMainnet.readContract({
    address: MANAGEMENT_FEE,
    abi,
    functionName: "getRecipientForFund",
    args: [comptrollerProxy],
  });
}
