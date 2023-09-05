import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IFundValueCalculatorRouter } from "@enzymefinance/abis/IFundValueCalculatorRouter";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";

export async function getNetAssetValue(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  try {
    const {
      result: [asset, value],
    } = await client.simulateContract({
      ...readContractParameters(args),
      abi: IFundValueCalculatorRouter,
      functionName: "calcNav",
      address: args.valueCalculator,
      args: [args.vaultProxy],
    });

    return { asset, value };
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
