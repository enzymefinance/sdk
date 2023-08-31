import { MAX_UINT_256 } from "../../../constants/misc.js";
import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const minMaxInvestmentPolicySettingsEncoding = [
  {
    type: "uint256",
    name: "minInvestmentAmount",
  },
  {
    type: "uint256",
    name: "maxInvestmentAmount",
  },
] as const;

export type MinMaxInvestmentPolicySettings = {
  /**
   * The minimum investment amount enforced by this policy.
   *
   * @remarks
   *
   * If a depositor attempts to deposit less than this amount, the transaction will revert.
   *
   * @defaultValue 0n
   */
  minInvestmentAmount: bigint;
  /**
   * The maximum investment amount enforced by this policy.
   *
   * @remarks
   *
   * If a depositor attempts to deposit more than this amount, the transaction will revert.
   *
   * @defaultValue MAX_UINT_256
   */
  maxInvestmentAmount: bigint;
};

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
export function encodeMinMaxInvestmentPolicySettings({
  minInvestmentAmount = 0n,
  maxInvestmentAmount = MAX_UINT_256,
}: Partial<MinMaxInvestmentPolicySettings>): Hex {
  if (minInvestmentAmount > maxInvestmentAmount) {
    throw new Error("maxInvestmentAmount should be greater than or equal to minInvestmentAmount");
  }

  return encodeAbiParameters(minMaxInvestmentPolicySettingsEncoding, [minInvestmentAmount, maxInvestmentAmount]);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeMinMaxInvestmentPolicySettings(settings: Hex): MinMaxInvestmentPolicySettings {
  const [minInvestmentAmount, maxInvestmentAmount] = decodeAbiParameters(
    minMaxInvestmentPolicySettingsEncoding,
    settings,
  );

  return {
    minInvestmentAmount,
    maxInvestmentAmount,
  };
}
