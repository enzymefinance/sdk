import { IFundDeployer } from "@enzymefinance/abis/IFundDeployer";
import { prepareFunctionParams } from "../utils/viem.js";
import { toSeconds } from "../utils/conversion.js";
import { decodeFeeSettings, encodeFeeSettings, type FeeSettings } from "../fees/settings.js";
import { decodePolicySettings, encodePolicySettings, type PolicySettings } from "../policies/settings.js";
import { decodeFunctionData, getAbiItem } from "viem";
import type { Hex, Address } from "viem";
import type { PartialPick } from "../utils/types.js";

export interface SetupVaultParams {
  vaultOwner: Address;
  vaultName: string;
  vaultSymbol: string;
  denominationAsset: Address;
  sharesActionTimelock: bigint;
  feeSettings: Hex | FeeSettings[];
  policySettings: Hex | PolicySettings[];
}

export type PrepareSetupVaultParamsArgs = PartialPick<
  SetupVaultParams,
  "sharesActionTimelock" | "feeSettings" | "policySettings"
>;

export function prepareSetupVaultParams({
  vaultOwner,
  vaultName,
  vaultSymbol,
  denominationAsset,
  sharesActionTimelock = toSeconds({ days: 1 }),
  feeSettings = [],
  policySettings = [],
}: PrepareSetupVaultParamsArgs) {
  let encodedFeeSettings: Hex = "0x";
  if (typeof feeSettings === "string") {
    encodedFeeSettings = feeSettings;
  } else if (feeSettings.length > 0) {
    encodedFeeSettings = encodeFeeSettings(feeSettings);
  }

  let encodedPolicySettings: Hex = "0x";
  if (typeof policySettings === "string") {
    encodedPolicySettings = policySettings;
  } else if (policySettings.length > 0) {
    encodedPolicySettings = encodePolicySettings(policySettings);
  }

  return prepareFunctionParams({
    abi: getAbiItem({ abi: IFundDeployer, name: "createNewFund" }),
    args: [
      vaultOwner,
      vaultName,
      vaultSymbol,
      denominationAsset,
      sharesActionTimelock,
      encodedFeeSettings,
      encodedPolicySettings,
    ],
  });
}

export function decodeSetupVaultParams(params: Hex): SetupVaultParams {
  const abi = getAbiItem({ abi: IFundDeployer, name: "createNewFund" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [
    vaultOwner,
    vaultName,
    vaultSymbol,
    denominationAsset,
    sharesActionTimelock,
    encodedFeeSettings,
    encodedPolicySettings,
  ] = decoded.args;

  const feeSettings = encodedFeeSettings !== "0x" ? decodeFeeSettings(encodedFeeSettings) : [];
  const policySettings = encodedPolicySettings !== "0x" ? decodePolicySettings(encodedPolicySettings) : [];

  return {
    vaultOwner,
    vaultName,
    vaultSymbol,
    denominationAsset,
    sharesActionTimelock,
    feeSettings,
    policySettings,
  };
}
