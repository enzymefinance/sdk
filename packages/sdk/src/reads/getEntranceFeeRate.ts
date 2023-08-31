import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IEntranceRateBurnFee } from "@enzymefinance/abis/IEntranceRateBurnFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getEntranceFeeRate(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    entranceFee: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IEntranceRateBurnFee,
    functionName: "getRateForFund",
    args: [args.comptrollerProxy],
    address: args.entranceFee,
  });
}
