import * as Abis from "@enzymefinance/abis";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";
import { Viem } from "../Utils";

export async function getCanonicalAssetValue(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    baseAsset: Address;
    amount: bigint;
    quoteAsset: Address;
  }>,
) {
  try {
    const { result } = await Viem.simulateContract(client, args, {
      abi: Abis.IValueInterpreter,
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
