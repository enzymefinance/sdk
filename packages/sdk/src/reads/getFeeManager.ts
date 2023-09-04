import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import type { Address, PublicClient } from "viem";

export function getFeeManager(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IComptrollerLib,
    functionName: "getFeeManager",
    address: args.comptrollerProxy,
  });
}
