import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { getFeeManager } from "./getFeeManager.js";
import { IFeeManager } from "@enzymefinance/abis/IFeeManager";
import type { Address, PublicClient } from "viem";

export async function getEnabledFees(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    feeManager?: Address;
  }>,
) {
  const feeManager = args.feeManager ?? (await getFeeManager(client, args));

  return client.readContract({
    ...readContractParameters(args),
    abi: IFeeManager,
    functionName: "getEnabledFeesForFund",
    args: [args.comptrollerProxy],
    address: feeManager,
  });
}
