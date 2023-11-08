import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { Viem } from "../../Utils.js";

export * as AllowedAdapterIncomingAssets from "./Policies/AllowedAdapterIncomingAssets.js";
export * as AllowedAdapters from "./Policies/AllowedAdapters.js";
export * as AllowedAdaptersPerManager from "./Policies/AllowedAdaptersPerManager.js";
export * as AllowedAssetsForRedemption from "./Policies/AllowedAssetsForRedemption.js";
export * as AllowedDepositRecipients from "./Policies/AllowedDepositRecipients.js";
export * as AllowedExternalPositionTypes from "./Policies/AllowedExternalPositionTypes.js";
export * as AllowedExternalPositionTypesPerManager from "./Policies/AllowedExternalPositionTypesPerManager.js";
export * as AllowedSharesTransferRecipients from "./Policies/AllowedSharesTransferRecipients.js";
export * as CumulativeSlippageTolerance from "./Policies/CumulativeSlippageTolerance.js";
export * as MinAssetBalancesPostRedemption from "./Policies/MinAssetBalancesPostRedemption.js";
export * as MinMaxInvestment from "./Policies/MinMaxInvestment.js";

const getListIdsForFundAbi = {
  inputs: [
    {
      internalType: "address",
      name: "_comptrollerProxy",
      type: "address",
    },
  ],
  name: "getListIdsForFund",
  outputs: [
    {
      internalType: "uint256[]",
      name: "listIds_",
      type: "uint256[]",
    },
  ],
  stateMutability: "view",
  type: "function",
} as const;

export function getListIds(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    policyContract: Address;
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: [getListIdsForFundAbi],
    functionName: "getListIdsForFund",
    args: [args.comptrollerProxy],
    address: args.policyContract,
  });
}

export function getIdentifier(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    policy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IPolicy,
    functionName: "identifier",
    address: args.policy,
  });
}
