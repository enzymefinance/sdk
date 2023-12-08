import * as Abis from "@enzymefinance/abis";
import type { Address } from "viem";
import { Viem } from "../Utils.js";

export type DepositMode = typeof DepositMode[keyof typeof DepositMode];
export const DepositMode = {
  Direct: 0,
  Request: 1,
} as const;

export function setUseDepositApprovals(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    vaultProxy: Address;
    managers: Address[];
    redemptionAsset: Address;
    useDepositApproval: boolean;
    useRedemptionApproval: boolean;
    useTransferApproval: boolean;
    depositMode: DepositMode;
    windowConfig: {
      firstWindowStart: bigint;
      duration: number;
      frequency: number;
      relativeSharesCap: bigint;
    };
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperFactory,
    functionName: "deploy",
    address: args.sharesWrapper,
    args: [
      args.vaultProxy,
      args.managers,
      args.redemptionAsset,
      args.useDepositApproval,
      args.useRedemptionApproval,
      args.useTransferApproval,
      args.depositMode,
      args.windowConfig,
    ],
  });
}
