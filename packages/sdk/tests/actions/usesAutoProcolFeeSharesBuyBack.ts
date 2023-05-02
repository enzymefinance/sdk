import { publicClient } from "../globals.js";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { type Address } from "viem";

export function usesAutoProcolFeeSharesBuyBack({ address }: { address: Address }) {
  return publicClient.readContract({
    address,
    abi: IComptroller,
    functionName: "doesAutoProtocolFeeSharesBuyback",
  });
}
