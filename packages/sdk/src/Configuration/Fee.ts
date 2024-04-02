import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

export {
  Action,
  encodeSettings,
  decodeSettings,
  type SettingsArgs,
  payoutOutstandingFees,
  type PayoutOutstandingFeesParams,
  settleContinuousFees,
  type SettleContinuousFeesParams,
} from "../_internal/FeeManager.js";

export function getRecipient(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    fee: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IFee,
    functionName: "getRecipientForFund",
    args: [args.comptrollerProxy],
    address: args.fee,
  });
}
