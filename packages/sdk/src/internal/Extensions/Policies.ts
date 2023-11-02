import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import type { Address, PublicClient } from "viem";

export * as AllowedAdapters from "@enzymefinance/sdk/internal/Extensions/Policies/AllowedAdapters";
export * as AllowedAdaptersPerManager from "@enzymefinance/sdk/internal/Extensions/Policies/AllowedAdaptersPerManager";
export * as AllowedAssetsForRedemption from "@enzymefinance/sdk/internal/Extensions/Policies/AllowedAssetsForRedemption";
export * as AllowedDepositRecipients from "@enzymefinance/sdk/internal/Extensions/Policies/AllowedDepositRecipients";
export * as AllowedExternalPositionTypes from "@enzymefinance/sdk/internal/Extensions/Policies/AllowedExternalPositionTypes";
export * as AllowedExternalPositionTypesPerManager from "@enzymefinance/sdk/internal/Extensions/Policies/AllowedExternalPositionTypesPerManager";
export * as AllowedSharesTransferRecipients from "@enzymefinance/sdk/internal/Extensions/Policies/AllowedSharesTransferRecipients";
export * as CumulativeSlippageTolerance from "@enzymefinance/sdk/internal/Extensions/Policies/CumulativeSlippageTolerance";
export * as MinAssetBalancesPostRedemption from "@enzymefinance/sdk/internal/Extensions/Policies/MinAssetBalancesPostRedemption";
export * as MinMaxInvestment from "@enzymefinance/sdk/internal/Extensions/Policies/MinMaxInvestment";

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
