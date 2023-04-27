import { ZERO_ADDRESS } from "../constants/misc.js";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { type Address, type PublicClient, isAddressEqual } from "viem";
import { readContract } from "viem/contract";

export type GetAutoProtocolFeeSharesBuyBackEnabledParams = {
  comptrollerProxy: Address;
};

export async function getAutoProtocolFeeSharesBuyBackEnabled(
  client: PublicClient,
  { comptrollerProxy }: GetAutoProtocolFeeSharesBuyBackEnabledParams,
) {
  const address = await readContract(client, {
    abi: IComptroller,
    address: comptrollerProxy,
    functionName: "getGasRelayPaymaster",
  });

  return !isAddressEqual(address, ZERO_ADDRESS);
}
