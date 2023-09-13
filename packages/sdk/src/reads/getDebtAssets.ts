import { invariant } from "../utils/assertions.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IExternalPosition } from "@enzymefinance/abis/IExternalPosition";
import type { Address, PublicClient } from "viem";

export async function getDebtAssets(
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
    functionName: "getDebtAssets",
    address: args.externalPosition,
  });

  return assets.map((asset, index) => {
    const amount = amounts[index];

    invariant(amount !== undefined, "amount must be defined");

    return {
      asset,
      amount,
    };
  });
}
