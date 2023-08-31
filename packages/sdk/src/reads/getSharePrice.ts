import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IFundValueCalculatorRouter } from "@enzymefinance/abis/IFundValueCalculatorRouter";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getSharePrice(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  try {
    const {
      result: [asset, value],
    } = await simulateContract(client, {
      ...readContractParameters(args),
      abi: IFundValueCalculatorRouter,
      functionName: "calcNetShareValue",
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
