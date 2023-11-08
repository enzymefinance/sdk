import * as Abis from "@enzymefinance/abis";
import { type Address, type PublicClient, isAddressEqual, zeroAddress } from "viem";
import { Viem } from "./Utils.js";

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

export function getRelayerBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IGasRelayPaymasterLib,
    address: args.comptrollerProxy,
    functionName: "getRelayHubDeposit",
  });
}
