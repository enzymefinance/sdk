import { type Address, getAbiItem } from "viem";
import { publicClient } from "../globals.js";
import { IComptroller } from "../../../abis/src/abis/IComptroller.js";

export function usesAutoProcolFeeSharesBuyBack({ address }: { address: Address }) {
  return publicClient.readContract({
    address,
    abi: [getAbiItem({ abi: IComptroller, name: "doesAutoProtocolFeeSharesBuyback" })],
    functionName: "doesAutoProtocolFeeSharesBuyback",
  });
}
