import * as Abis from "@enzymefinance/abis";
import { type Address, type PublicClient, isAddressEqual } from "viem";
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
  return Viem.readContract(client, args, {
    abi: Abis.IPolicy,
    functionName: "identifier",
    address: args.policy,
  });
}

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
