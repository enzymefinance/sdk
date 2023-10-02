import * as Abis from "@enzymefinance/abis";
import { type Types, Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, zeroAddress } from "viem";

//--------------------------------------------------------------------------------------------
// SETTINGS
//--------------------------------------------------------------------------------------------

const performanceFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate", // bps
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export type PerformanceFeeSettings = {
  feeRateInBps: bigint;
  feeRecipient: Address;
};

export function encodePerformanceFeeSettings({
  feeRateInBps,
  feeRecipient = zeroAddress,
}: Types.PartialPick<PerformanceFeeSettings, "feeRecipient">): Hex {
  return encodeAbiParameters(performanceFeeSettingsEncoding, [feeRateInBps, feeRecipient]);
}

export function decodePerformanceFeeSettings(settings: Hex): PerformanceFeeSettings {
  const [feeRateInBps, feeRecipient] = decodeAbiParameters(performanceFeeSettingsEncoding, settings);

  return {
    feeRateInBps,
    feeRecipient,
  };
}

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export async function getInfo(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    performanceFee: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IPerformanceFee,
    functionName: "getFeeInfoForFund",
    args: [args.comptrollerProxy],
    address: args.performanceFee,
  });
}
