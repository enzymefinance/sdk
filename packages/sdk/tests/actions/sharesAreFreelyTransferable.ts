import { publicClientMainnet } from "../globals.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import type { Address } from "viem";

export function sharesAreFreelyTransferable({ address }: { address: Address }) {
  return publicClientMainnet.readContract({
    address,
    abi: IVaultLib,
    functionName: "sharesAreFreelyTransferable",
  });
}
