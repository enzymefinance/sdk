import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import * as Assets from "./Asset.js";

import { Assertion, Viem } from "./Utils.js";

export * as Integrations from "./Portfolio/Integrations.js";
export * as VoteDelegation from "./Portfolio/VoteDelegation.js";

export {
  Action as ExternalPositionAction,
  callEncode as callExternalPositionEncode,
  callDecode as callExternalPositionDecode,
  type CallArgs as ExternalPositionCallArgs,
  createEncode as createExternalPositionEncode,
  createDecode as createExternalPositionDecode,
  type CreateArgs as CreateExternalPositionArgs,
  removeEncode as removeExternalPositionEncode,
  removeDecode as removeExternalPositionDecode,
  type RemoveArgs as RemoveExternalPositionArgs,
  reactivateEncode as reactivateExternalPositionEncode,
  reactivateDecode as reactivateExternalPositionDecode,
  type ReactivateArgs as ReactivateExternalPositionArgs,
} from "./_internal/ExternalPositionManager.js";

export {
  Action as IntegrationAdapterAction,
  Selector as IntegrationAdapterSelector,
  callEncode as callIntegrationAdapterEncode,
  callDecode as callIntegrationAdapterDecode,
  type CallArgs as CallIntegrationAdapterArgs,
  addTrackedAssetsEncode,
  addTracketAssetsDecode,
  type AddTracketAssetsArgs,
  removeTrackedAssetsEncode,
  removeTrackedAssetsDecode,
  type RemoveTrackedAssetsArgs,
} from "./_internal/IntegrationManager.js";

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

//--------------------------------------------------------------------------------------------
// EXTERNAL POSITIONS
//--------------------------------------------------------------------------------------------

export function isActiveExternalPosition(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    externalPosition: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IVaultLib,
    address: args.vaultProxy,
    functionName: "isActiveExternalPosition",
    args: [args.externalPosition],
  });
}

export async function getTotalValueForAllExternalPositions(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  const addresses = await getActiveExternalPositions(client, args);
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

  return values.reduce((total, value) => total + value, 0n);
}

export function getActiveExternalPositions(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IVaultLib,
    functionName: "getActiveExternalPositions",
    address: args.vaultProxy,
  });
}

export async function getExternalPositionManagedAssets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    externalPosition: Address;
  }>,
) {
  const {
    result: [assets, amounts],
  } = await Viem.simulateContract(client, args, {
    abi: Abis.IExternalPosition,
    functionName: "getManagedAssets",
    address: args.externalPosition,
  });

  return assets.map((asset, index) => {
    const amount = amounts[index];
    Assertion.invariant(amount !== undefined, "Missing managed asset amount");

    return {
      asset,
      amount,
    };
  });
}

export async function getExternalPositionDebtAssets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    externalPosition: Address;
  }>,
) {
  const {
    result: [assets, amounts],
  } = await Viem.simulateContract(client, args, {
    abi: Abis.IExternalPosition,
    functionName: "getDebtAssets",
    address: args.externalPosition,
  });

  return assets.map((asset, index) => {
    const amount = amounts[index];
    Assertion.invariant(amount !== undefined, "Missing debt asset amount");

    return {
      asset,
      amount,
    };
  });
}

export async function getExternalPositionAssets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    externalPosition: Address;
  }>,
) {
  const [debtAssets, managedAssets] = await Promise.all([
    getExternalPositionDebtAssets(client, args),
    getExternalPositionManagedAssets(client, args),
  ]);

  return {
    debtAssets,
    managedAssets,
  };
}

export function getExternalPositionType(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    externalPosition: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IExternalPositionProxy,
    functionName: "getExternalPositionType",
    address: args.externalPosition,
  });
}

export function getTypeLabel(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    externalPositionFactory: Address;
    typeId: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IExternalPositionFactory,
    functionName: "getLabelForPositionType",
    address: args.externalPositionFactory,
    args: [args.typeId],
  });
}
