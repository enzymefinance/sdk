import * as Abis from "@enzymefinance/abis";
import { type Address, type PublicClient, isAddressEqual } from "viem";
import { readContract } from "viem/actions";
import { getEnabledPolicies } from "../Configuration.js";
import { Viem } from "../Utils.js";

export {
  enable,
  update,
  disable,
  encodeSettings,
  decodeSettings,
  type SettingsArgs,
} from "../_internal/PolicyManager.js";

export async function isEnabled(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    policy: Address;
    policyManager: Address;
    comptrollerProxy: Address;
  }>,
): Promise<boolean> {
  const enabledPolicies = await getEnabledPolicies(client, args);
  return enabledPolicies.some((enabledPolicy) => isAddressEqual(enabledPolicy, args.policy));
}

export function getIdentifier(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    policy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IPolicy,
    functionName: "identifier",
    address: args.policy,
  });
}

//--------------------------------------------------------------------------------------------
// METHODS FOR POLICIES THAT USE ADDRESS LISTS
//--------------------------------------------------------------------------------------------

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
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: [getListIdsForFundAbi],
    functionName: "getListIdsForFund",
    args: [args.comptrollerProxy],
    address: args.policyContract,
  });
}

//--------------------------------------------------------------------------------------------
// METHODS FOR POLICIES THAT USE PRICELESS ASSET BYPASS
//--------------------------------------------------------------------------------------------

export function getPricelessAssetBypassTimeLimit(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    policy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ICumulativeSlippageTolerancePolicy,
    functionName: "getPricelessAssetBypassTimeLimit",
    address: args.policy,
  });
}

export function getPricelessAssetBypassTimelock(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    policy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ICumulativeSlippageTolerancePolicy,
    functionName: "getPricelessAssetBypassTimelock",
    address: args.policy,
  });
}
