import { IFundDeployer } from "@enzymefinance/abis/IFundDeployer";
import { Address, Bytes } from "../types.js";
import { prepareFunctionParams } from "../utils/viem.js";
import { toSeconds } from "../utils/conversion.js";
import { decodeAbiParameters, decodeFunctionData, getAbiItem } from "viem";
import { AbiParametersToPrimitiveTypes } from "abitype";
import { decodeFeeSettings } from "../fees/settings.js";
import { decodePolicySettings } from "../policies/settings.js";

export interface SetupVaultParams {
  vaultOwner: Address;
  vaultName: string;
  vaultSymbol: string;
  denominationAsset: Address;
  sharesActionTimelock?: bigint;
  feeSettings?: Bytes;
  policySettings?: Bytes;
}

export function setupVaultParams({
  vaultOwner,
  vaultName,
  vaultSymbol,
  denominationAsset,
  sharesActionTimelock = toSeconds({ days: 1 }),
  feeSettings = "0x",
  policySettings = "0x",
}: SetupVaultParams) {
  return prepareFunctionParams({
    abi: IFundDeployer,
    functionName: "createNewFund",
    args: [vaultOwner, vaultName, vaultSymbol, denominationAsset, sharesActionTimelock, feeSettings, policySettings],
  });
}

export function decodeSetupVaultParams(params: Bytes) {
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
  ] = decoded.args as AbiParametersToPrimitiveTypes<typeof abi.inputs>;

  const feeSettings = decodeFeeSettings(encodedFeeSettings);
  const policySettings = decodePolicySettings(encodedPolicySettings);

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
