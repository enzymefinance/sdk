import { IVault } from "@enzymefinance/abis/IVault";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { expect, it } from "vitest";

it("should work", async () => {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  // TODO: This is just an experiment!
  const lib = await client.readContract({
    address: "0x1b83ba4527c837d462d5b78d65a097dabae5ea89",
    abi: IVault,
    functionName: "getVaultLib",
  });

  expect(lib).toBe("0x891dee0483eBAA922E274ddD2eBBaA2D33468A38");
});
