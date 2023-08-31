import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IFundValueCalculatorRouter } from "@enzymefinance/abis/IFundValueCalculatorRouter";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getNetAssetValueInAsset(
  client: PublicClient,
  args: ReadContractParameters<{
    asset: Address;
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  try {
    const { result } = await simulateContract(client, {
      ...readContractParameters(args),
      abi: IFundValueCalculatorRouter,
      functionName: "calcNavInAsset",
      address: args.valueCalculator,
      args: [args.vaultProxy, args.asset],
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
