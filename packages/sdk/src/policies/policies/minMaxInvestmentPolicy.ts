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

export function encodeMinMaxInvestmentPolicySettings({
  minInvestmentAmount,
  maxInvestmentAmount,
}: {
  minInvestmentAmount: bigint;
  maxInvestmentAmount: bigint;
}) {
  if (minInvestmentAmount > maxInvestmentAmount) {
    throw new Error("maxInvestmentAmount should be greater than or equal to minInvestmentAmount");
  }
  return encodeAbiParameters(minMaxInvestmentPolicySettingsEncoding, [minInvestmentAmount, maxInvestmentAmount]);
}

export function decodeMinMaxInvestmentPolicySettings(settings: Hex) {
  const [minInvestmentAmount, maxInvestmentAmount] = decodeAbiParameters(
    minMaxInvestmentPolicySettingsEncoding,
    settings,
  );

  return {
    minInvestmentAmount,
    maxInvestmentAmount,
  };
}
