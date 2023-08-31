import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IDispatcher } from "@enzymefinance/abis/IDispatcher";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getFundDeployerForVaultProxy(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
    dispatcher: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IDispatcher,
    functionName: "getFundDeployerForVaultProxy",
    address: args.dispatcher,
    args: [args.vaultProxy],
  });
}
