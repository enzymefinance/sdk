import * as Abis from "@enzymefinance/abis";
import * as Assets from "@enzymefinance/sdk/Assets";
import { Assertion, Viem } from "@enzymefinance/sdk/Utils";
import type { Address, PublicClient } from "viem";

export * as ExternalPositions from "@enzymefinance/sdk/internal/Extensions/ExternalPositions";
export * as IntegrationAdapters from "@enzymefinance/sdk/internal/Extensions/IntegrationAdapters";

export {
  call as callIntegration,
  type CallParams as CallOnIntegrationParams,
  addTrackedAssets,
  type AddTracketAssetsParams,
  removeTracketAssets,
  type RemoveTrackedAssetsParams,
} from "@enzymefinance/sdk/internal/IntegrationManager";

export {
  call as callExternalPosition,
  type CallParams as CallOnExternalPositionParams,
  create as createExternalPosition,
  type CreateParams as CreateExternalPositionParams,
  remove as removeExternalPosition,
  type RemoveParams as RemoveExternalPositionParams,
  reactivate as reactivateExternalPosition,
  type ReactivateParams as ReactivateExternalPositionParams,
} from "@enzymefinance/sdk/internal/ExternalPositionManager";

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

export async function getTotalExternalPositionsValue(
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

export function getExternalPositionTypeLabel(
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
