import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import type { Address, PublicClient } from "viem";

export function getPolicyManager(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IComptrollerLib,
    functionName: "getPolicyManager",
    address: args.comptrollerProxy,
  });
}
