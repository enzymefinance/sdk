import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { Viem } from "./Utils.js";

export function hasMigrationRequest(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    dispatcher: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IDispatcher,
    functionName: "hasMigrationRequest",
    address: args.dispatcher,
    args: [args.vaultProxy],
  });
}

export function hasExecutableMigrationRequest(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    dispatcher: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IDispatcher,
    address: args.dispatcher,
    functionName: "hasExecutableMigrationRequest",
    args: [args.vaultProxy],
  });
}

export function getRemainingMigrationRequestTimelock(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    dispatcher: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IDispatcher,
    functionName: "getTimelockRemainingForMigrationRequest",
    address: args.dispatcher,
    args: [args.vaultProxy],
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

export function hasReconfigurationRequest(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    fundDeployer: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IFundDeployer,
    functionName: "hasReconfigurationRequest",
    address: args.fundDeployer,
    args: [args.vaultProxy],
  });
}
