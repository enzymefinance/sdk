import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";

export async function getSpecificAssetsRedemptionExpectedAmounts(
  client: PublicClient,
  args: ReadContractParameters<{
    signer: Address;
    recipient: Address;
    sharesQuantity: bigint;
    payoutAssets: Address[];
    payoutPercentages: bigint[];
  }>,
) {
  try {
    const { result: payoutAmounts } = await client.simulateContract({
      ...readContractParameters(args),
      abi: IComptrollerLib,
      functionName: "redeemSharesForSpecificAssets",
      address: args.signer,
      args: [args.recipient, args.sharesQuantity, args.payoutAssets, args.payoutPercentages],
    });

    const output: Record<Address, bigint> = {};
    for (let i = 0; i < args.payoutAssets.length; i++) {
      // rome-ignore lint/style/noNonNullAssertion: <explanation>
      const payoutAsset = args.payoutAssets[i]!;
      // rome-ignore lint/style/noNonNullAssertion: <explanation>
      const payoutAmount = payoutAmounts[i]!;
      output[payoutAsset] = payoutAmount;
    }

    return output;
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
