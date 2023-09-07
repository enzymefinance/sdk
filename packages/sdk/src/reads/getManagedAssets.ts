import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IExternalPosition } from "@enzymefinance/abis/IExternalPosition";
import type { Address, PublicClient } from "viem";

export async function getManagedAssets(
  client: PublicClient,
  args: ReadContractParameters<{
    externalPosition: Address;
  }>,
) {
  const {
    result: [assets, amounts],
  } = await client.simulateContract({
    ...readContractParameters(args),
    abi: IExternalPosition,
    functionName: "getManagedAssets",
    address: args.externalPosition,
  });

  return assets.map((asset, index) => ({
    asset,
    amount: amounts[index],
  }));
}
