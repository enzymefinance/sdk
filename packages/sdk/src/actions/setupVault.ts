import { type FeeSettings, decodeFeeSettings, encodeFeeSettings } from "../fees/settings.js";
import { type PolicySettings, decodePolicySettings, encodePolicySettings } from "../policies/settings.js";
import { toSeconds } from "../utils/conversion.js";
import type { PartialPick } from "../utils/types.js";
import { prepareFunctionParams } from "../utils/viem.js";
import { IFundDeployer } from "@enzymefinance/abis/IFundDeployer";
import { decodeFunctionData, getAbiItem } from "viem";
import type { Address, Hex } from "viem";

export type SetupVaultParams<
  TFeeSettings extends Hex | FeeSettings[] = Hex | FeeSettings[],
  TPolicySettings extends Hex | PolicySettings[] = Hex | PolicySettings[],
> = {
  /**
   * The address of the owner of the vault.
   */
  vaultOwner: Address;
  /**
   * The name of the vault.
   *
   * @remarks
   *
   * This is the ERC20 name of the vault token.
   */
  vaultName: string;
  /**
   * The symbol of the vault.
   *
   * @remarks
   *
   * This is the ERC20 symbol of the vault token.
   */
  vaultSymbol: string;
  /**
   * The address of the denomination asset of the vault.
   *
   * @remarks
   *
   * This is the asset that the vault will be denominated in. This asset will be used to
   * compute the performance of the vault.
   */
  denominationAsset: Address;
  /**
   * The shares action timelock of the vault.
   *
   * @remarks
   *
   * This is the time in seconds that must pass after shares have been bought they can be transferred
   * or redeemed. This is a safety mechanism to make certain attacks on & arbitrage of vault shares
   * more difficult.
   */
  sharesActionTimelock: bigint;
  /**
   * The fee settings of the vault.
   */
  feeSettings: TFeeSettings;
  /**
   * The policy settings of the vault.
   */
  policySettings: TPolicySettings;
};

export type PrepareSetupVaultParamsArgs = PartialPick<
  SetupVaultParams,
  "sharesActionTimelock" | "feeSettings" | "policySettings"
>;

/**
 * Prepare the parameters for the `createNewFund` function.
 *
 * @returns The prepared parameters to be encoded.
 */
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

/**
 * Decode the parameters for the `createNewFund` function.
 *
 * @returns The decoded parameters.
 */
export function decodeSetupVaultParams(params: Hex): SetupVaultParams<FeeSettings[], PolicySettings[]> {
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
