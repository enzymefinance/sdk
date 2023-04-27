import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { getAbiItem } from "viem";

export function prepareClaimOwnershipParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "claimOwnership" }),
  });
}
