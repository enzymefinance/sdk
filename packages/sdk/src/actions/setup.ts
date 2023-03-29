import { IFundDeployer } from "@enzymefinance/abis/IFundDeployer";
import { Address, Bytes } from "../types.js";
import { encodeFeeManagerConfig } from "../fees/config.js";
import { prepareFunctionParams } from "../utils/viem.js";
import { toSeconds } from "../utils/conversion.js";
import { encodePolicyManagerConfig } from "../policies/config.js";

export interface SetupVaultParams {
  vaultOwner: Address;
  vaultName: string;
  vaultSymbol: string;
  denominationAsset: Address;
  sharesActionTimelock?: bigint;
  feeSettings?: { address: Address; settings: Bytes }[];
  policySettings?: { address: Address; settings: Bytes }[];
}

export function setupVaultParams({
  vaultOwner,
  vaultName,
  vaultSymbol,
  denominationAsset,
  sharesActionTimelock = toSeconds({ days: 1 }),
  feeSettings,
  policySettings,
}: SetupVaultParams) {
  const fees = feeSettings !== undefined && feeSettings.length > 0 ? encodeFeeManagerConfig(feeSettings) : "0x";
  const policies =
    policySettings !== undefined && policySettings.length > 0 ? encodePolicyManagerConfig(policySettings) : "0x";

  return prepareFunctionParams({
    abi: IFundDeployer,
    functionName: "createNewFund",
    args: [vaultOwner, vaultName, vaultSymbol, denominationAsset, sharesActionTimelock, fees, policies],
  });
}
