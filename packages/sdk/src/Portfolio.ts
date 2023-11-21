import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import * as Assets from "./Assets.js";
import { getActive, getDebtAssets, getManagedAssets, getType } from "./Portfolio/ExternalPosition.js";
import { Viem } from "./Utils.js";

export * as ExternalPosition from "./Portfolio/ExternalPosition.js";
export * as ExternalPositions from "./Portfolio/ExternalPositions.js";

export * as Integration from "./Portfolio/Integration.js";
export * as Integrations from "./Portfolio/Integrations.js";

export * as VoteDelegation from "./Portfolio/VoteDelegation.js";

export async function getPortfolio(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  const [externalPositionAddresses, trackedAssetAddresses] = await Promise.all([
    getActive(client, args),
    getTrackedAssets(client, args),
  ]);

  const getExternalPositionsData = Promise.all(
    externalPositionAddresses.map(async (externalPosition, _i) => {
      const [externalPositionType, debtAssets, managedAssets] = await Promise.all([
        getType(client, { ...args, externalPosition }),
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
      const amount = await Assets.getBalanceOf(client, { ...args, asset, owner: args.vaultProxy });
      return { asset, amount };
    }),
  );

  const [externalPositions, trackedAssets] = await Promise.all([getExternalPositionsData, getTracketAssetsAmounts]);

  return { externalPositions, trackedAssets };
}

export function getTrackedAssets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IVaultLib,
    functionName: "getTrackedAssets",
    address: args.vaultProxy,
  });
}
