import { IManualValueOracleFactory, IManualValueOracleLib } from "@enzymefinance/abis";
import { type Address, type Client, stringToHex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function deploy(args: {
  manualValueOracleFactory: Address;
  owner: Address;
  updater: Address;
  description: string;
}) {
  return new Viem.PopulatedTransaction({
    abi: IManualValueOracleFactory,
    functionName: "deploy",
    address: args.manualValueOracleFactory,
    args: [args.owner, args.updater, stringToHex(args.description, { size: 32 })],
  });
}

export function setUpdater(args: {
  manualValueOracle: Address;
  updater: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: IManualValueOracleLib,
    functionName: "setUpdater",
    address: args.manualValueOracle,
    args: [args.updater],
  });
}

export function setNominatedOwner(args: {
  manualValueOracle: Address;
  nominatedOwner: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: IManualValueOracleLib,
    functionName: "setNominatedOwner",
    address: args.manualValueOracle,
    args: [args.nominatedOwner],
  });
}

export function updateValue(args: {
  manualValueOracle: Address;
  value: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: IManualValueOracleLib,
    functionName: "updateValue",
    address: args.manualValueOracle,
    args: [args.value],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getValueWithTimestamp(
  client: Client,
  args: Viem.ContractCallParameters<{ manualValueOracle: Address }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IManualValueOracleLib,
    address: args.manualValueOracle,
    functionName: "getValueWithTimestamp",
  });
}
export function getLastUpdated(client: Client, args: Viem.ContractCallParameters<{ manualValueOracle: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IManualValueOracleLib,
    address: args.manualValueOracle,
    functionName: "getLastUpdated",
  });
}
export function getUpdater(client: Client, args: Viem.ContractCallParameters<{ manualValueOracle: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IManualValueOracleLib,
    address: args.manualValueOracle,
    functionName: "getUpdater",
  });
}
export function getValue(client: Client, args: Viem.ContractCallParameters<{ manualValueOracle: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IManualValueOracleLib,
    address: args.manualValueOracle,
    functionName: "getValue",
  });
}
