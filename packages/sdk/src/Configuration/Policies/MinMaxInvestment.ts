import * as Abis from "@enzymefinance/abis";
import {
  type Address,
  Chain,
  type Hex,
  type PublicClient,
  Transport,
  decodeAbiParameters,
  encodeAbiParameters,
  maxUint256,
} from "viem";
import { Viem } from "../../Utils.js";

const settingsEncoding = [
  {
    type: "uint256",
    name: "minInvestmentAmount",
  },
  {
    type: "uint256",
    name: "maxInvestmentAmount",
  },
] as const;

export type Settings = {
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
export function encodeSettings(args: Partial<Settings>): Hex {
  return encodeAbiParameters(settingsEncoding, [
    args.minInvestmentAmount ?? 0n,
    args.maxInvestmentAmount ?? maxUint256,
  ]);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeSettings(settings: Hex): Settings {
  const [minInvestmentAmount, maxInvestmentAmount] = decodeAbiParameters(settingsEncoding, settings);

  return {
    minInvestmentAmount,
    maxInvestmentAmount,
  };
}

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export function getSettings<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    minMaxInvestmentPolicy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IMinMaxInvestmentPolicy,
    functionName: "getFundSettings",
    args: [args.comptrollerProxy],
    address: args.minMaxInvestmentPolicy,
  });
}
