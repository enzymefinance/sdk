import { getAssetInfo } from "./getAssetInfo.js";
import { IExternalPosition } from "@enzymefinance/abis/IExternalPosition";
import type { Address, PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getManagedAssets(
  client: PublicClient,
  {
    address,
  }: {
    address: Address;
  },
) {
  const {
    result: [assets, amounts],
  } = await simulateContract(client, {
    abi: IExternalPosition,
    functionName: "getManagedAssets",
    address,
  });

  return Promise.all(
    assets.map(async (asset, index) => ({
      asset: await getAssetInfo(client, { asset }),
      amount: amounts[index] ?? 0n,
    })),
  );
}
