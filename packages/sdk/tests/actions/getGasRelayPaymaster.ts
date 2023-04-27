import type { Address } from "viem";
import { publicClient } from "../globals.js";
import { IComptroller } from "@enzymefinance/abis/IComptroller";

export function getGasRelayPaymaster({
  comptrollerProxy,
}: {
  comptrollerProxy: Address;
}) {
  return publicClient.readContract({
    address: comptrollerProxy,
    abi: IComptroller,
    functionName: "getGasRelayPaymaster",
  });
}
