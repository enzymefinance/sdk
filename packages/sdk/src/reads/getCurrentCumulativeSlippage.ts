import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { ICumulativeSlippageTolerancePolicy } from "@enzymefinance/abis/ICumulativeSlippageTolerancePolicy";
import type { Address, PublicClient } from "viem";
import { multicall } from "viem/contract";

export async function getCurrentCumulativeSlippage(
  client: PublicClient,
  args: ReadContractParameters<{
    cumulativeSlippageTolerancePolicy: Address;
    comptrollerProxy: Address;
  }>,
) {
  const [tolerancePeriodDuration, { cumulativeSlippage, lastSlippageTimestamp, tolerance: configuredTolerance }] =
    await multicall(client, {
      ...readContractParameters(args),
      allowFailure: false,
      contracts: [
        {
          address: args.cumulativeSlippageTolerancePolicy,
          abi: ICumulativeSlippageTolerancePolicy,
          functionName: "getTolerancePeriodDuration",
        },
        {
          address: args.cumulativeSlippageTolerancePolicy,
          abi: ICumulativeSlippageTolerancePolicy,
          functionName: "getPolicyInfoForFund",
          args: [args.comptrollerProxy],
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
