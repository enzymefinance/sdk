import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient } from "viem";

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

export function getActiveExternalPositions(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  return client.readContract({
    abi: Abis.IVaultLib,
    functionName: "getActiveExternalPositions",
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
