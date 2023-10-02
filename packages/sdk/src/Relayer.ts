import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, isAddressEqual, zeroAddress } from "viem";

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
