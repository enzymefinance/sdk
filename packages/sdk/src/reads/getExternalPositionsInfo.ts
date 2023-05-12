import { getDebtAssets } from "./getDebtAssets.js";
import { getExternalPositionType } from "./getExternalPositionType.js";
import { getLabelForExternalPositionType } from "./getLabelForPositionType.js";
import { getManagedAssets } from "./getManagedAssets.js";
import { getVaultActiveExternalPositions } from "./getVaultActiveExternalPositions.js";
import type { Address, PublicClient } from "viem";

export async function getExternalPositionsInfo(
  client: PublicClient,
  {
    vault,
    externalPositionFactory,
  }: {
    vault: Address;
    externalPositionFactory: Address;
  },
) {
  const externalPositions = await getVaultActiveExternalPositions(client, { vault });
  const externalPositionsInfo = await Promise.all(
    externalPositions.map(async (externalPosition, _i) => {
      const [externalPositionType, debtAssets, managedAssets] = await Promise.all([
        getExternalPositionType(client, { address: externalPosition }),
        getDebtAssets(client, { address: externalPosition }),
        getManagedAssets(client, { address: externalPosition }),
      ]);

      const externalPositionLabel = await getLabelForExternalPositionType(client, {
        externalPositionFactory,
        typeId: externalPositionType,
      });

      return {
        externalPosition,
        externalPositionLabel,
        debtAssets,
        managedAssets,
      };
    }),
  );

  return externalPositionsInfo;
}
