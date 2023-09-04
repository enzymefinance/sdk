import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IExitRateBurnFee } from "@enzymefinance/abis/IExitRateBurnFee";
import type { Address, PublicClient } from "viem";

export async function getExitFeeRates(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    exitFee: Address;
  }>,
) {
  const commonArgs = readContractParameters(args);

  const getInKindRateForFund = client.readContract({
    ...commonArgs,
    abi: IExitRateBurnFee,
    functionName: "getInKindRateForFund",
    args: [args.comptrollerProxy],
    address: args.exitFee,
  });

  const getSpecificAssetsRateForFund = client.readContract({
    ...commonArgs,
    abi: IExitRateBurnFee,
    functionName: "getSpecificAssetsRateForFund",
    args: [args.comptrollerProxy],
    address: args.exitFee,
  });

  const [inKindRate, specificAssetsRate] = await Promise.all([getInKindRateForFund, getSpecificAssetsRateForFund]);

  return {
    inKindRate,
    specificAssetsRate,
  };
}
