import { type Address } from "viem";
import { publicClient } from "../globals.js";
import { IVault } from "@enzymefinance/abis/IVault";

export function sharesAreFreelyTransferable({ address }: { address: Address }) {
  return publicClient.readContract({
    address,
    abi: IVault,
    functionName: "sharesAreFreelyTransferable",
  });
}
