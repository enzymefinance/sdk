import * as Abis from "@enzymefinance/abis";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, zeroAddress } from "viem";
import { readContract } from "viem/actions";
import { type Types, Viem } from "../../Utils.js";

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

export type SetRecipientParams = {
  comptrollerProxy: Address;
  fee: Address;
  recipient: Address;
};

export function setRecipient(args: SetRecipientParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IPerformanceFee,
    functionName: "setRecipientForFund",
    address: args.fee,
    args: [args.comptrollerProxy, args.recipient],
  });
}

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export function getInfo(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    performanceFee: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IPerformanceFee,
    functionName: "getFeeInfoForFund",
    args: [args.comptrollerProxy],
    address: args.performanceFee,
  });
}
