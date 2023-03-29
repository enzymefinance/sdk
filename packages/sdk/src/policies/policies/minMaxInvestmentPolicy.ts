import { encodeAbiParameters } from "viem";

export function encodeMinMaxInvestmentPolicyConfig({
  minInvestmentAmount,
  maxInvestmentAmount,
}: {
  minInvestmentAmount: bigint;
  maxInvestmentAmount: bigint;
}) {
  return encodeAbiParameters(
    [
      {
        type: "uint256",
        name: "minInvestmentAmount",
      },
      {
        type: "uint256",
        name: "maxInvestmentAmount",
      },
    ],
    [minInvestmentAmount, maxInvestmentAmount],
  );
}
