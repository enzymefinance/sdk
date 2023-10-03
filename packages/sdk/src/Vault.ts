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

export function getMigrationRequestDetails(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vault: Address;
    dispatcher: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IDispatcher,
    functionName: "getMigrationRequestDetailsForVaultProxy",
    address: args.dispatcher,
    args: [args.vault],
  });
}

export function getHasMigrationRequest(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vault: Address;
    dispatcher: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IDispatcher,
    functionName: "hasMigrationRequest",
    address: args.dispatcher,
    args: [args.vault],
  });
}

export function hasExecutableMigrationRequest(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    dispatcher: Address;
    vaultProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IDispatcher,
    address: args.dispatcher,
    functionName: "hasExecutableMigrationRequest",
    args: [args.vaultProxy],
  });
}

export function getHasReconfigurationRequest(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vault: Address;
    fundDeployer: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IFundDeployer,
    functionName: "hasReconfigurationRequest",
    address: args.fundDeployer,
    args: [args.vault],
  });
}

export function getVaultTimelockRemainingForMigrationRequest(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vault: Address;
    dispatcher: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IDispatcher,
    functionName: "getTimelockRemainingForMigrationRequest",
    address: args.dispatcher,
    args: [args.vault],
  });
}

export function doesAutoProtocolFeeSharesBuyback(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    functionName: "doesAutoProtocolFeeSharesBuyback",
    address: args.comptrollerProxy,
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
