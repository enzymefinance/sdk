import { IValueInterpreter } from "@enzymefinance/abis/IValueInterpreter";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getCanonicalAssetValue(
  client: PublicClient,
  {
    valueInterpreter,
    baseAsset,
    amount,
    quoteAsset,
  }: {
    valueInterpreter: Address;
    baseAsset: Address;
    amount: bigint;
    quoteAsset: Address;
  },
) {
  try {
    const { result } = await simulateContract(client, {
      abi: IValueInterpreter,
      functionName: "calcCanonicalAssetValue",
      address: valueInterpreter,
      args: [baseAsset, amount, quoteAsset],
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
