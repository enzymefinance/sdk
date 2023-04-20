import { type Address } from "viem";
import { publicClient } from "../globals.js";
import { IComptroller } from "@enzymefinance/abis/IComptroller";

export function usesAutoProcolFeeSharesBuyBack({ address }: { address: Address }) {
  return publicClient.readContract({
    address,
    abi: IComptroller,
    functionName: "doesAutoProtocolFeeSharesBuyback",
  });
}
