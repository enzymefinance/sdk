import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import type { Address } from "viem";
import { publicClientMainnet } from "../globals.js";

export function usesAutoProcolFeeSharesBuyBack({ address }: { address: Address }) {
  return publicClientMainnet.readContract({
    address,
    abi: IComptrollerLib,
    functionName: "doesAutoProtocolFeeSharesBuyback",
  });
}
