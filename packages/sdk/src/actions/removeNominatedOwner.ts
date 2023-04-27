import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { getAbiItem } from "viem";

export function prepareRemoveNominatedOwnerParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "removeNominatedOwner" }),
  });
}
