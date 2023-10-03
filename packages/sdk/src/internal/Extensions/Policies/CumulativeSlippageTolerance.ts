import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";
import { multicall } from "viem/contract";

const settingsEncoding = [
  {
    type: "uint256",
    name: "tolerance",
  },
] as const;

export type Settings = {
  /**
   * The allowed cumulative slippage tolerance.
   *
   * @remarks
   *
   * This is the maximum amount of slippage that the vault is allowed to accumulate over time.
   * If the vault's cumulative slippage exceeds this amount, the trade will revert. The allowed
   * slippage replenishes over time.
   */
  slippageTolerance: bigint;
};

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
export function encodeSettings(args: Settings): Hex {
  return encodeAbiParameters(settingsEncoding, [args.slippageTolerance]);
}

export function decodeSettings(settings: Hex): Settings {
  const [slippageTolerance] = decodeAbiParameters(settingsEncoding, settings);

  return {
    slippageTolerance,
  };
}

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export function getInfoForFund(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    cumulativeSlippageTolerancePolicy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.ICumulativeSlippageTolerancePolicy,
    functionName: "getPolicyInfoForFund",
    args: [args.comptrollerProxy],
    address: args.cumulativeSlippageTolerancePolicy,
  });
}

export async function getCurrentCumulativeSlippage(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cumulativeSlippageTolerancePolicy: Address;
    comptrollerProxy: Address;
  }>,
) {
  const [tolerancePeriodDuration, { cumulativeSlippage, lastSlippageTimestamp, tolerance: configuredTolerance }] =
    await multicall(client, {
      ...args,
      allowFailure: false,
      contracts: [
        {
          address: args.cumulativeSlippageTolerancePolicy,
          abi: Abis.ICumulativeSlippageTolerancePolicy,
          functionName: "getTolerancePeriodDuration",
        },
        {
          address: args.cumulativeSlippageTolerancePolicy,
          abi: Abis.ICumulativeSlippageTolerancePolicy,
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
