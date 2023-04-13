import { IFundDeployer } from "@enzymefinance/abis/IFundDeployer";
import { prepareFunctionParams } from "../utils/viem.js";
import { toSeconds } from "../utils/conversion.js";
import { decodeFeeSettings } from "../fees/settings.js";
import { decodePolicySettings } from "../policies/settings.js";
import { decodeFunctionData, getAbiItem } from "viem";
import type { Hex, Address } from "viem";

export interface PrepareSetupVaultParamsArgs {
  vaultOwner: Address;
  vaultName: string;
  vaultSymbol: string;
  denominationAsset: Address;
  sharesActionTimelock?: bigint;
  feeSettings?: Hex;
  policySettings?: Hex;
}

export function prepareSetupVaultParams({
  vaultOwner,
  vaultName,
  vaultSymbol,
  denominationAsset,
  sharesActionTimelock = toSeconds({ days: 1 }),
  feeSettings = "0x",
  policySettings = "0x",
}: PrepareSetupVaultParamsArgs) {
  const abi = getAbiItem({ abi: IFundDeployer, name: "createNewFund" });

  return prepareFunctionParams({
    abi: [abi],
    functionName: "createNewFund",
    args: [vaultOwner, vaultName, vaultSymbol, denominationAsset, sharesActionTimelock, feeSettings, policySettings],
  });
}

export function decodeSetupVaultParams(params: Hex) {
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
