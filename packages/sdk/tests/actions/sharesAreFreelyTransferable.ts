import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import type { Address } from "viem";
import { publicClientMainnet } from "../globals.js";

export function sharesAreFreelyTransferable({ address }: { address: Address }) {
  return publicClientMainnet.readContract({
    address,
    abi: IVaultLib,
    functionName: "sharesAreFreelyTransferable",
  });
}
