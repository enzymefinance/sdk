import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IFundDeployer } from "@enzymefinance/abis/IFundDeployer";
import type { Address, PublicClient } from "viem";

export function getVaultHasReconfigurationRequest(
  client: PublicClient,
  args: ReadContractParameters<{
    vault: Address;
    dispatcher: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IFundDeployer,
    functionName: "hasReconfigurationRequest",
    address: args.dispatcher,
    args: [args.vault],
  });
}
