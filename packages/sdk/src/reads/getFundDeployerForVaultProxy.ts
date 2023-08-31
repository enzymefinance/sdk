import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IDispatcher } from "@enzymefinance/abis/IDispatcher";
import type { Address, PublicClient } from "viem";

export function getFundDeployerForVaultProxy(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
    dispatcher: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IDispatcher,
    functionName: "getFundDeployerForVaultProxy",
    address: args.dispatcher,
    args: [args.vaultProxy],
  });
}
