import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import type { Address, PublicClient } from "viem";

export function getComptrollerProxy(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IVaultLib,
    functionName: "getAccessor",
    address: args.vaultProxy,
  });
}
