import * as Abis from "@enzymefinance/abis";
import { type Address, Chain, type PublicClient, Transport, isAddressEqual, zeroAddress } from "viem";
import { Viem } from "./Utils.js";

export async function isRelayerEnabled<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
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

export async function getGasRelayPaymaster<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
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

export function getRelayerBalance<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
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
