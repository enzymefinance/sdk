import { ICumulativeSlippageTolerancePolicy } from "@enzymefinance/abis/ICumulativeSlippageTolerancePolicy";
import type { Address, PublicClient } from "viem";
import { multicall } from "viem/contract";

export type GetCurrentCumulativeSlippageParams = {
  cumulativeSlippageTolerancePolicy: Address;
  comptrollerProxy: Address;
};

export type GetCurrentCumulativeSlippageResult = {
  tolerancePeriodDuration: bigint;
  lastSlippageTimestamp: bigint;
  currentCumulativeSlippage: bigint;
  policyIsEnabled: boolean;
  configuredTolerance: bigint;
};

export async function getCurrentCumulativeSlippage(
  client: PublicClient,
  { comptrollerProxy, cumulativeSlippageTolerancePolicy }: GetCurrentCumulativeSlippageParams,
): Promise<GetCurrentCumulativeSlippageResult> {
  const [tolerancePeriodDuration, { cumulativeSlippage, lastSlippageTimestamp, tolerance: configuredTolerance }] =
    await multicall(client, {
      allowFailure: false,
      contracts: [
        {
          address: cumulativeSlippageTolerancePolicy,
          abi: ICumulativeSlippageTolerancePolicy,
          functionName: "getTolerancePeriodDuration",
        },
        {
          address: cumulativeSlippageTolerancePolicy,
          abi: ICumulativeSlippageTolerancePolicy,
          functionName: "getPolicyInfoForFund",
          args: [comptrollerProxy],
        },
      ],
    });

  const policyIsEnabled = configuredTolerance !== 0n;
  const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));
  const secondsSinceLastTimestamp = currentTimestamp - lastSlippageTimestamp;

  let currentCumulativeSlippage: bigint;

  // If the period has elapsed, current slippage is always 0.
  if (secondsSinceLastTimestamp >= tolerancePeriodDuration) {
    currentCumulativeSlippage = 0n;
  } else {
    const rateOfDecay = cumulativeSlippage / tolerancePeriodDuration;
    currentCumulativeSlippage = cumulativeSlippage - rateOfDecay * secondsSinceLastTimestamp;
  }

  return {
    tolerancePeriodDuration,
    lastSlippageTimestamp,
    currentCumulativeSlippage,
    policyIsEnabled,
    configuredTolerance,
  };
}
