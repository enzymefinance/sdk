import * as Abis from "@enzymefinance/abis";
import type { Address, Client, Hex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "./Utils.js";

//--------------------------------------------------------------------------------------------
// CREATION
//--------------------------------------------------------------------------------------------

export type CreateVaultParams = {
  fundDeployer: Address;
  owner: Address;
  name: string;
  symbol: string;
  denominationAsset: Address;
  sharesActionTimelockInSeconds: bigint;
  feeManagerConfigData: Hex;
  policyManagerConfigData: Hex;
};

export function createVault(args: CreateVaultParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IFundDeployer,
    functionName: "createNewFund",
    address: args.fundDeployer,
    args: [
      args.owner,
      args.name,
      args.symbol,
      args.denominationAsset,
      args.sharesActionTimelockInSeconds,
      args.feeManagerConfigData,
      args.policyManagerConfigData,
    ],
  });
}

//--------------------------------------------------------------------------------------------
// MIGRATION
//--------------------------------------------------------------------------------------------

export type CreateMigrationRequestParams = {
  fundDeployer: Address;
  vaultProxy: Address;
  denominationAsset: Address;
  sharesActionTimelockInSeconds: bigint;
  feeManagerConfigData: Hex;
  policyManagerConfigData: Hex;
  bypassPrevReleaseFailure: boolean;
};

export function createMigrationRequest(args: CreateMigrationRequestParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IFundDeployer,
    functionName: "createMigrationRequest",
    address: args.fundDeployer,
    args: [
      args.vaultProxy,
      args.denominationAsset,
      args.sharesActionTimelockInSeconds,
      args.feeManagerConfigData,
      args.policyManagerConfigData,
      args.bypassPrevReleaseFailure,
    ],
  });
}

export type CancelMigrationParams = {
  fundDeployer: Address;
  vaultProxy: Address;
  bypassPrevReleaseFailure: boolean;
};

export function cancelMigration(args: CancelMigrationParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IFundDeployer,
    functionName: "cancelMigration",
    address: args.fundDeployer,
    args: [args.vaultProxy, args.bypassPrevReleaseFailure],
  });
}

export type ExecuteMigrationParams = {
  fundDeployer: Address;
  vaultProxy: Address;
  bypassPrevReleaseFailure: boolean;
};

export function executeMigration(args: ExecuteMigrationParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IFundDeployer,
    functionName: "executeMigration",
    address: args.fundDeployer,
    args: [args.vaultProxy, args.bypassPrevReleaseFailure],
  });
}

export function hasMigrationRequest(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    dispatcher: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IDispatcher,
    functionName: "hasMigrationRequest",
    address: args.dispatcher,
    args: [args.vaultProxy],
  });
}

export function hasExecutableMigrationRequest(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    dispatcher: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IDispatcher,
    address: args.dispatcher,
    functionName: "hasExecutableMigrationRequest",
    args: [args.vaultProxy],
  });
}

export function getRemainingMigrationRequestTimelock(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    dispatcher: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IDispatcher,
    functionName: "getTimelockRemainingForMigrationRequest",
    address: args.dispatcher,
    args: [args.vaultProxy],
  });
}

export async function getMigrationRequestDetails(
  client: Client,
  args: Viem.ContractCallParameters<{
    vault: Address;
    dispatcher: Address;
  }>,
) {
  const [nextFundDeployer, nextVaultAccessor, nextVaultLib, executableTimestamp] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IDispatcher,
    functionName: "getMigrationRequestDetailsForVaultProxy",
    address: args.dispatcher,
    args: [args.vault],
  });

  return {
    nextFundDeployer,
    nextVaultAccessor,
    nextVaultLib,
    executableTimestamp,
  };
}

//--------------------------------------------------------------------------------------------
// RECONFIGURATION
//--------------------------------------------------------------------------------------------

export type CreateReconfigurationRequestParams = {
  fundDeployer: Address;
  vaultProxy: Address;
  denominationAsset: Address;
  sharesActionTimelockInSeconds: bigint;
  feeManagerConfigData: Hex;
  policyManagerConfigData: Hex;
};

export function createReconfigurationRequest(args: CreateReconfigurationRequestParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IFundDeployer,
    functionName: "createReconfigurationRequest",
    address: args.fundDeployer,
    args: [
      args.vaultProxy,
      args.denominationAsset,
      args.sharesActionTimelockInSeconds,
      args.feeManagerConfigData,
      args.policyManagerConfigData,
    ],
  });
}

export type CancelReconfigurationParams = {
  fundDeployer: Address;
  vaultProxy: Address;
};

export function cancelReconfiguration(args: CancelReconfigurationParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IFundDeployer,
    functionName: "cancelReconfiguration",
    address: args.fundDeployer,
    args: [args.vaultProxy],
  });
}

export type ExecuteReconfigurationParams = {
  fundDeployer: Address;
  vaultProxy: Address;
};

export function executeReconfiguration(args: ExecuteReconfigurationParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IFundDeployer,
    functionName: "executeReconfiguration",
    address: args.fundDeployer,
    args: [args.vaultProxy],
  });
}

export function hasReconfigurationRequest(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    fundDeployer: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IFundDeployer,
    functionName: "hasReconfigurationRequest",
    address: args.fundDeployer,
    args: [args.vaultProxy],
  });
}

export function getReconfigurationRequestDetails(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    fundDeployer: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IFundDeployer,
    functionName: "getReconfigurationRequestForVaultProxy",
    address: args.fundDeployer,
    args: [args.vaultProxy],
  });
}
