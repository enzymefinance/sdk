import type { ReadContractParameters } from "../utils/viem.js";
import { getActiveExternalPositions } from "./getActiveExternalPositions.js";
import { getAssetAmount } from "./getAssetAmount.js";
import { getDebtAssets } from "./getDebtAssets.js";
import { getExternalPositionType } from "./getExternalPositionType.js";
import { getManagedAssets } from "./getManagedAssets.js";
import { getTrackedAssets } from "./getTrackedAssets.js";
import type { Address, PublicClient } from "viem";

export async function getPortfolio(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
  }>,
) {
  const [externalPositionAddresses, trackedAssetAddresses] = await Promise.all([
    getActiveExternalPositions(client, args),
    getTrackedAssets(client, args),
  ]);

  const getExternalPositionsData = Promise.all(
    externalPositionAddresses.map(async (externalPosition, _i) => {
      const [externalPositionType, debtAssets, managedAssets] = await Promise.all([
        getExternalPositionType(client, { ...args, externalPosition }),
        getDebtAssets(client, { ...args, externalPosition }),
        getManagedAssets(client, { ...args, externalPosition }),
      ]);

      return {
        externalPosition,
        externalPositionType,
        debtAssets,
        managedAssets,
      };
    }),
  );

  const getTracketAssetsAmounts = Promise.all(
    trackedAssetAddresses.map(async (asset) => {
      const amount = await getAssetAmount(client, { ...args, asset, owner: args.vaultProxy });
      return { asset, amount };
    }),
  );

  const [externalPositions, trackedAssets] = await Promise.all([getExternalPositionsData, getTracketAssetsAmounts]);

  return { externalPositions, trackedAssets };
}
