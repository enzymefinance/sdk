import * as Abis from "@enzymefinance/abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "./Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export type SetFreelyTransferableSharesParams = {
  vaultProxy: Address;
};

export function setFreelyTransferableShares(args: SetFreelyTransferableSharesParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IVaultLib,
    functionName: "setFreelyTransferableShares",
    address: args.vaultProxy,
  });
}

export type SetNominatedOwnerParams = {
  /**
   * The address of the vault's `VaultProxy` contract.
   */
  vaultProxy: Address;
  /**
   * The address of the next owner.
   */
  nextNominatedOwner: Address;
};

export function setNominatedOwner(args: SetNominatedOwnerParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IVaultLib,
    functionName: "setNominatedOwner",
    args: [args.nextNominatedOwner],
    address: args.vaultProxy,
  });
}

export type RemoveNominatedOwnerParams = {
  /**
   * The address of the vault's `VaultProxy` contract.
   */
  vaultProxy: Address;
};

export function removeNominatedOwner(args: RemoveNominatedOwnerParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IVaultLib,
    functionName: "removeNominatedOwner",
    address: args.vaultProxy,
  });
}

export type ClaimOwnershipParams = {
  /**
   * The address of the vault's `VaultProxy` contract.
   */
  vaultProxy: Address;
};

export function claimOwnership(args: ClaimOwnershipParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IVaultLib,
    functionName: "claimOwnership",
    address: args.vaultProxy,
  });
}

export type SetNameParams = {
  vaultProxy: Address;
  name: string;
};

export function setName(args: SetNameParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IVaultLib,
    functionName: "setName",
    address: args.vaultProxy,
    args: [args.name],
  });
}

export type SetSymbolParams = {
  vaultProxy: Address;
  symbol: string;
};

export function setSymbol(args: SetSymbolParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IVaultLib,
    functionName: "setSymbol",
    address: args.vaultProxy,
    args: [args.symbol],
  });
}

export function addAssetManagers(
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    managers: ReadonlyArray<Address>;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IVaultLib,
    functionName: "addAssetManagers",
    address: args.vaultProxy,
    args: [args.managers],
  });
}

export function removeAssetManagers(
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    managers: ReadonlyArray<Address>;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IVaultLib,
    functionName: "removeAssetManagers",
    address: args.vaultProxy,
    args: [args.managers],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getName(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IVaultLib,
    functionName: "name",
    address: args.vaultProxy,
  });
}

export function getSymbol(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IVaultLib,
    functionName: "symbol",
    address: args.vaultProxy,
  });
}

export function getOwner(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IVaultLib,
    functionName: "getOwner",
    address: args.vaultProxy,
  });
}

export function getNominatedOwner(
  client: Client,
  args: Viem.ContractCallParameters<{
    vault: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IVaultLib,
    functionName: "getNominatedOwner",
    address: args.vault,
  });
}

export function getDenominationAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IComptrollerLib,
    functionName: "getDenominationAsset",
    address: args.comptrollerProxy,
  });
}

export function getComptrollerProxy(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IVaultLib,
    functionName: "getAccessor",
    address: args.vaultProxy,
  });
}

export function getPolicyManager(
  client: Client,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IComptrollerLib,
    functionName: "getPolicyManager",
    address: args.comptrollerProxy,
  });
}

export function getFeeManager(
  client: Client,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IComptrollerLib,
    functionName: "getFeeManager",
    address: args.comptrollerProxy,
  });
}

export function sharesAreFreelyTransferable(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IVaultLib,
    functionName: "sharesAreFreelyTransferable",
    address: args.vaultProxy,
  });
}

export function getFundDeployer(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IVaultLib,
    functionName: "getFundDeployer",
    address: args.vaultProxy,
  });
}
