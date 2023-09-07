import { publicClientMainnet } from "../../tests/globals.js";
import { getActiveExternalPositions } from "./getActiveExternalPositions.js";
import { getExternalPositionAssets } from "./getExternalPositionAssets.js";
import type { Address } from "viem";

export async function getIsExternalPositionsValueZero(vaultProxy: Address) {
  const addresses = await getActiveExternalPositions(publicClientMainnet, {
    vaultProxy,
  });

  const values = await Promise.all(
    addresses.map(async (address) => {
      const { debtAssets, managedAssets } = await getExternalPositionAssets(publicClientMainnet, {
        externalPosition: address,
      });

      const debtAssetsValue =
        debtAssets.map((asset) => asset.amount).reduce((acc, amount) => (acc ?? 0n) + (amount ?? 0n), 0n) ?? 0n;
      const managedAssetsValues =
        managedAssets.map((asset) => asset.amount).reduce((acc, amount) => (acc ?? 0n) + (amount ?? 0n), 0n) ?? 0n;

      if (managedAssetsValues > debtAssetsValue) {
        return managedAssetsValues - debtAssetsValue;
      }

      return 0n;
    }),
  );

  const totalValue = values.reduce((acc, value) => acc + value, 0n);

  return totalValue === 0n;
}
