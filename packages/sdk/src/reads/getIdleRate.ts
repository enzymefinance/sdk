import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IIdlePriceFeed } from "@enzymefinance/abis/IIdlePriceFeed";
import { type Address, ContractFunctionExecutionError, type PublicClient, parseUnits } from "viem";

export async function getIdleRate(
  client: PublicClient,
  args: ReadContractParameters<{
    priceFeed: Address;
    poolToken: Address;
    poolTokenDecimals: number;
  }>,
) {
  try {
    const {
      result: [underlyings, amounts],
    } = await client.simulateContract({
      ...readContractParameters(args),
      abi: IIdlePriceFeed,
      functionName: "calcUnderlyingValues",
      address: args.priceFeed,
      args: [args.poolToken, parseUnits("1", args.poolTokenDecimals)],
    });

    const output: Record<Address, bigint> = {};
    for (let i = 0; i < underlyings.length; i++) {
      // rome-ignore lint/style/noNonNullAssertion: <explanation>
      const underlying = underlyings[i]!;
      // rome-ignore lint/style/noNonNullAssertion: <explanation>
      const amount = amounts[i]!;

      output[underlying] = amount;
    }

    return output;
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
