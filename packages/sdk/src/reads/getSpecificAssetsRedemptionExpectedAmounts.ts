import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";

export function getSpecificAssetsRedemptionExpectedAmounts(
  client: PublicClient,
  args: ReadContractParameters<{
    signerAddress: Address;
    recipient: Address;
    sharesQuantity: bigint;
    payoutAssets: Address[];
    payoutPercentages: bigint[];
  }>,
) {
  try {
    return client.simulateContract({
      ...readContractParameters(args),
      abi: IComptrollerLib,
      functionName: "redeemSharesForSpecificAssets",
      address: args.signerAddress,
      args: [args.recipient, args.sharesQuantity, args.payoutAssets, args.payoutPercentages],
    });
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
