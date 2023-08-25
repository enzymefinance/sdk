import { publicClient } from "../globals.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import type { Address } from "viem";

export function usesAutoProcolFeeSharesBuyBack({ address }: { address: Address }) {
  return publicClient.readContract({
    address,
    abi: IComptrollerLib,
    functionName: "doesAutoProtocolFeeSharesBuyback",
  });
}
