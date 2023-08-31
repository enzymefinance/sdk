import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IExternalPosition } from "@enzymefinance/abis/IExternalPosition";
import type { Address, PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getDebtAssets(
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
    functionName: "getDebtAssets",
    address: args.externalPosition,
  });

  return assets.map((asset, index) => ({
    asset: asset,
    amount: amounts[index],
  }));
}
