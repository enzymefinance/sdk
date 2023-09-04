import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IIdlePriceFeed } from "@enzymefinance/abis/IIdlePriceFeed";
import { type Address, ContractFunctionExecutionError, type PublicClient, parseUnits } from "viem";
import { simulateContract } from "viem/contract";

export async function getIdleRate(
  client: PublicClient,
  args: ReadContractParameters<{
    idlePriceFeed: Address;
    idlePoolToken: { address: Address; decimals: number };
  }>,
) {
  const idleTokenUnit = parseUnits("1", args.idlePoolToken.decimals);

  try {
    const { result } = await simulateContract(client, {
      ...readContractParameters(args),
      abi: IIdlePriceFeed,
      functionName: "calcUnderlyingValues",
      address: args.idlePriceFeed,
      args: [args.idlePoolToken.address, idleTokenUnit],
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
