import { IFundValueCalculatorRouter } from "@enzymefinance/abis/IFundValueCalculatorRouter";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getVaultGavInAsset(
  client: PublicClient,
  {
    vault,
    asset,
    fundValueCalculatorRouter,
  }: {
    vault: Address;
    asset: Address;
    fundValueCalculatorRouter: Address;
  },
) {
  try {
    const { result } = await simulateContract(client, {
      abi: IFundValueCalculatorRouter,
      functionName: "calcGavInAsset",
      address: fundValueCalculatorRouter,
      args: [vault, asset],
    });

    return result;
  } catch (error) {
    console.log(error);
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
