import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getDenominationAsset(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IComptrollerLib,
    functionName: "getDenominationAsset",
    address: args.comptrollerProxy,
  });
}
