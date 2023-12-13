import * as Abis from "@enzymefinance/abis";
import { type Address, type PublicClient, isAddressEqual, parseAbi, zeroAddress } from "viem";
import { Viem } from "./Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export type DeployGasRelayPaymasterParams = {
  comptrollerProxy: Address;
};

export function deployGasRelayPaymaster(args: DeployGasRelayPaymasterParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "deployGasRelayPaymaster",
    address: args.comptrollerProxy,
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function isRelayerEnabled(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  const address = await Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    address: args.comptrollerProxy,
    functionName: "getGasRelayPaymaster",
  });

  return !isAddressEqual(address, zeroAddress);
}

export async function getGasRelayPaymaster(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    address: args.comptrollerProxy,
    functionName: "getGasRelayPaymaster",
  });
}

export function getRelayerBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    gasRelayPaymaster: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IGasRelayPaymasterLib,
    address: args.gasRelayPaymaster,
    functionName: "getRelayHubDeposit",
  });
}

export function getTrustedForwarder(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    gasRelayPaymaster: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IGasRelayPaymasterLib,
    address: args.gasRelayPaymaster,
    functionName: "trustedForwarder",
  });
}

export function getNonce(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    trustedForwarder: Address;
    sender: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function getNonce(address sender) view returns (uint256)"]),
    address: args.trustedForwarder,
    functionName: "getNonce",
    args: [args.sender],
  });
}
