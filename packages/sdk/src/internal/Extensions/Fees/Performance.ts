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
  rateInBps: bigint;
  recipient: Address;
};

export function encodePerformanceFeeSettings({
  rateInBps,
  recipient = zeroAddress,
}: Types.PartialPick<PerformanceFeeSettings, "recipient">): Hex {
  return encodeAbiParameters(performanceFeeSettingsEncoding, [rateInBps, recipient]);
}

export function decodePerformanceFeeSettings(settings: Hex): PerformanceFeeSettings {
  const [rateInBps, recipient] = decodeAbiParameters(performanceFeeSettingsEncoding, settings);

  return {
    rateInBps,
    recipient,
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
