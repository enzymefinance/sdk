import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import type { Address } from "viem";
import { publicClientMainnet } from "../globals.js";

export function getGasRelayPaymaster({
  comptrollerProxy,
}: {
  comptrollerProxy: Address;
}) {
  return publicClientMainnet.readContract({
    address: comptrollerProxy,
    abi: IComptrollerLib,
    functionName: "getGasRelayPaymaster",
  });
}
