import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { isPolicyEnabled } from "./isPolicyEnabled.js";
import { IAllowedDepositRecipientsPolicy } from "@enzymefinance/abis/IAllowedDepositRecipientsPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function isAllowedDepositor(
  client: PublicClient,
  args: ReadContractParameters<{
    allowedDepositRecipientsPolicy: Address;
    comptrollerProxy: Address;
    policyManager: Address;
    depositor: Address;
  }>,
) {
  const hasAllowedDepositorPolicy = await isPolicyEnabled(client, {
    ...args,
    policy: args.allowedDepositRecipientsPolicy,
  });

  if (!hasAllowedDepositorPolicy) {
    return true;
  }

  return readContract(client, {
    ...readContractParameters(args),
    abi: IAllowedDepositRecipientsPolicy,
    functionName: "passesRule",
    address: args.allowedDepositRecipientsPolicy,
    args: [args.comptrollerProxy, args.depositor],
  });
}
