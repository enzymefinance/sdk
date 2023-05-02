import { publicClient } from "../globals.js";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address } from "viem";

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
