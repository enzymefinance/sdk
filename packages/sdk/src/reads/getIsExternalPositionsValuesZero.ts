import type { ReadContractParameters } from "../utils/viem.js";
import { getActiveExternalPositions } from "./getActiveExternalPositions.js";
import { getExternalPositionAssets } from "./getExternalPositionAssets.js";
import type { Address, PublicClient } from "viem";

export async function getIsExternalPositionsValueZero(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
  }>,
) {
  const addresses = await getActiveExternalPositions(client, {
    vaultProxy: args.vaultProxy,
  });

  const values = await Promise.all(
    addresses.map(async (externalPosition) => {
      const { debtAssets, managedAssets } = await getExternalPositionAssets(client, {
        ...args,
        externalPosition,
      });

      const debtAssetsValue = debtAssets.map((asset) => asset.amount).reduce((acc, amount) => acc + amount, 0n);
      const managedAssetsValues = managedAssets.map((asset) => asset.amount).reduce((acc, amount) => acc + amount, 0n);

      if (managedAssetsValues > debtAssetsValue) {
        return managedAssetsValues - debtAssetsValue;
      }

      return 0n;
    }),
  );

  const totalValue = values.reduce((acc, value) => acc + value, 0n);

  return totalValue === 0n;
}
