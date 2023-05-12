import { IFundValueCalculatorRouter } from "@enzymefinance/abis/IFundValueCalculatorRouter";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getVaultSharePrice(
  client: PublicClient,
  {
    vault,
    fundValueCalculatorRouter,
  }: {
    vault: Address;
    fundValueCalculatorRouter: Address;
  },
) {
  try {
    const {
      result: [asset, value],
    } = await simulateContract(client, {
      abi: IFundValueCalculatorRouter,
      functionName: "calcNetShareValue",
      address: fundValueCalculatorRouter,
      args: [vault],
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
