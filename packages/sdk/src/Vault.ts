import * as Abis from "@enzymefinance/abis";
import { type Address, Chain, type PublicClient, Transport } from "viem";
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

export function getName<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
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

export function getSymbol<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
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

export function getOwner<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
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

export function getNominatedOwner<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
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

export function getDenominationAsset<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
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

export function getComptrollerProxy<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
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

export function getPolicyManager<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
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

export function getFeeManager<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
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

export function sharesAreFreelyTransferable<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
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
