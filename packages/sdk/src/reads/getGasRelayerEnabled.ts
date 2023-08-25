import { ZERO_ADDRESS } from "../constants/misc.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import { type Address, type PublicClient, isAddressEqual } from "viem";
import { readContract } from "viem/contract";

export async function getGasRelayerEnabled(
  client: PublicClient,
  {
    comptrollerProxy,
  }: {
    comptrollerProxy: Address;
  },
) {
  const address = await readContract(client, {
    abi: IComptrollerLib,
    address: comptrollerProxy,
    functionName: "getGasRelayPaymaster",
  });

  return !isAddressEqual(address, ZERO_ADDRESS);
}
