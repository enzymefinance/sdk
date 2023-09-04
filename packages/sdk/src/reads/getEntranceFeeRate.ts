import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IEntranceRateBurnFee } from "@enzymefinance/abis/IEntranceRateBurnFee";
import type { Address, PublicClient } from "viem";

export function getEntranceFeeRate(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    entranceFee: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IEntranceRateBurnFee,
    functionName: "getRateForFund",
    args: [args.comptrollerProxy],
    address: args.entranceFee,
  });
}
