import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { Viem } from "@enzymefinance/sdk/Utils";

export * as AllowedExternalPositionTypes from "@enzymefinance/sdk/internal/Extensions/Policies/AllowedExternalPositionTypes";
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
