import * as Abis from "@enzymefinance/abis";
import { type Address, type PublicClient } from "viem";
import { Viem } from "./Utils.js";

//--------------------------------------------------------------------------------------------
// OWNERSHIP
//--------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getName(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IVaultLib,
    functionName: "name",
    address: args.vaultProxy,
  });
}

export function getSymbol(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IVaultLib,
    functionName: "symbol",
    address: args.vaultProxy,
  });
}

export function getOwner(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IVaultLib,
    functionName: "getOwner",
    address: args.vaultProxy,
  });
}

export function getNominatedOwner(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vault: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IVaultLib,
    functionName: "getNominatedOwner",
    address: args.vault,
  });
}

export function getDenominationAsset(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    functionName: "getDenominationAsset",
    address: args.comptrollerProxy,
  });
}

export function getComptrollerProxy(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IVaultLib,
    functionName: "getAccessor",
    address: args.vaultProxy,
  });
}

export function getPolicyManager(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    functionName: "getPolicyManager",
    address: args.comptrollerProxy,
  });
}

export function getFeeManager(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    functionName: "getFeeManager",
    address: args.comptrollerProxy,
  });
}

export function sharesAreFreelyTransferable(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IVaultLib,
    functionName: "sharesAreFreelyTransferable",
    address: args.vaultProxy,
  });
}

export function addAssetManagers(
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    managers: Address[];
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
    managers: Address[];
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IVaultLib,
    functionName: "removeAssetManagers",
    address: args.vaultProxy,
    args: [args.managers],
  });
}
