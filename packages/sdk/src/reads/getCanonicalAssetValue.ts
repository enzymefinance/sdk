import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IValueInterpreter } from "@enzymefinance/abis/IValueInterpreter";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getCanonicalAssetValue(
  client: PublicClient,
  args: ReadContractParameters<{
    valueInterpreter: Address;
    baseAsset: Address;
    amount: bigint;
    quoteAsset: Address;
  }>,
) {
  try {
    const { result } = await simulateContract(client, {
      ...readContractParameters(args),
      abi: IValueInterpreter,
      functionName: "calcCanonicalAssetValue",
      address: args.valueInterpreter,
      args: [args.baseAsset, args.amount, args.quoteAsset],
    });

    return result;
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
