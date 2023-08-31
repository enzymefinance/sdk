import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IExternalPosition } from "@enzymefinance/abis/IExternalPosition";
import type { Address, PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getManagedAssets(
  client: PublicClient,
  args: ReadContractParameters<{
    externalPosition: Address;
  }>,
) {
  const {
    result: [assets, amounts],
  } = await simulateContract(client, {
    ...readContractParameters(args),
    abi: IExternalPosition,
    functionName: "getManagedAssets",
    address: args.externalPosition,
  });

  return assets.map(async (asset, index) => ({
    asset,
    amount: amounts[index],
  }));
}
