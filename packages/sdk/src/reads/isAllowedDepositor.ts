import { isPolicyEnabled } from "./isPolicyEnabled.js";
import { IAllowedDepositRecipientsPolicy } from "@enzymefinance/abis/IAllowedDepositRecipientsPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export type IsAllowedDepositorParams = {
  allowedDepositRecipientsPolicy: Address;
  comptrollerProxy: Address;
  policyManager: Address;
  depositor: Address;
};

export async function isAllowedDepositor(
  client: PublicClient,
  { depositor, comptrollerProxy, policyManager, allowedDepositRecipientsPolicy }: IsAllowedDepositorParams,
): Promise<boolean> {
  const hasAllowedDepositorPolicy = await isPolicyEnabled(client, {
    policy: allowedDepositRecipientsPolicy,
    comptrollerProxy,
    policyManager,
  });

  if (!hasAllowedDepositorPolicy) {
    return true;
  }

  return readContract(client, {
    abi: IAllowedDepositRecipientsPolicy,
    functionName: "passesRule",
    address: allowedDepositRecipientsPolicy,
    args: [comptrollerProxy, depositor],
  });
}
