import { decodeAbiParameters, encodeAbiParameters, type Hex } from "viem";

export const minMaxInvestmentPolicySettingsEncoding = [
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
  minInvestmentAmount: bigint;
  maxInvestmentAmount: bigint;
};

export function encodeMinMaxInvestmentPolicySettings({
  minInvestmentAmount,
  maxInvestmentAmount,
}: MinMaxInvestmentPolicySettings): Hex {
  if (minInvestmentAmount > maxInvestmentAmount) {
    throw new Error("maxInvestmentAmount should be greater than or equal to minInvestmentAmount");
  }
  return encodeAbiParameters(minMaxInvestmentPolicySettingsEncoding, [minInvestmentAmount, maxInvestmentAmount]);
}

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
