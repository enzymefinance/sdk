import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import * as Assets from "./Assets.js";
import {
  getActiveExternalPositions,
  getExternalPositionDebtAssets,
  getExternalPositionManagedAssets,
  getExternalPositionType,
} from "./Portfolio/ExternalPosition.js";
import { Viem } from "./Utils.js";

export * as ExternalPosition from "./Portfolio/ExternalPosition.js";
export * as ExternalPositions from "./Portfolio/ExternalPositions.js";

export * as IntegrationAdapter from "./Portfolio/IntegrationAdapter.js";
export * as IntegrationAdapters from "./Portfolio/IntegrationAdapters.js";

export * as VoteDelegation from "./Portfolio/VoteDelegation.js";

export async function getPortfolio(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
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
        getExternalPositionDebtAssets(client, { ...args, externalPosition }),
        getExternalPositionManagedAssets(client, { ...args, externalPosition }),
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
