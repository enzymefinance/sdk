import * as Abis from "@enzymefinance/abis";
import { Address, PublicClient } from "viem";
import { Assertion, Viem } from "../Utils.js";

export function isActive(
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

export async function getTotalValueForAll(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  const addresses = await getActive(client, args);
  const values = await Promise.all(
    addresses.map(async (externalPosition) => {
      const { debtAssets, managedAssets } = await getAssets(client, {
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

export function getActive(
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

export async function getManagedAssets(
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

export async function getDebtAssets(
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

export async function getAssets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    externalPosition: Address;
  }>,
) {
  const [debtAssets, managedAssets] = await Promise.all([getDebtAssets(client, args), getManagedAssets(client, args)]);

  return {
    debtAssets,
    managedAssets,
  };
}

export function getType(
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
