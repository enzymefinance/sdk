import { ZERO_ADDRESS } from "../constants/misc.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import { type Address, type PublicClient, isAddressEqual } from "viem";
import { readContract } from "viem/contract";

export async function isGasRelayerEnabled(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
  }>,
) {
  const address = await readContract(client, {
    ...readContractParameters(args),
    abi: IComptrollerLib,
    address: args.comptrollerProxy,
    functionName: "getGasRelayPaymaster",
  });

  return !isAddressEqual(address, ZERO_ADDRESS);
}
