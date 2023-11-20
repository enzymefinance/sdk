import * as Abis from "@enzymefinance/abis";
import { Address, PublicClient } from "viem";
import { Assertion, Viem } from "../Utils.js";

export {
  callEncode,
  callDecode,
  type CallArgs,
} from "../_internal/ExternalPositionManager.js";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  CreateExternalPosition: 0n,
  CallOnExternalPosition: 1n,
  RemoveExternalPosition: 2n,
  ReactivateExternalPosition: 3n,
} as const;

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
