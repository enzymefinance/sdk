import type { ReadContractParameters } from "../utils/viem.js";
import { getDebtAssets } from "./getDebtAssets.js";
import { getManagedAssets } from "./getManagedAssets.js";
import type { Address, PublicClient } from "viem";

export async function getExternalPositionAssets(
  client: PublicClient,
  args: ReadContractParameters<{
    externalPosition: Address;
  }>,
) {
  const [debtAssets, managedAssets] = await Promise.all([getDebtAssets(client, args), getManagedAssets(client, args)]);

  return {
    debtAssets,
    managedAssets,
  };
}
