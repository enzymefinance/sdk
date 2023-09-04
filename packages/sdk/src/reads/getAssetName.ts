import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import {
  type Address,
  ContractFunctionExecutionError,
  ContractFunctionZeroDataError,
  type PublicClient,
  hexToString,
  parseAbi,
} from "viem";

export async function getAssetName(
  client: PublicClient,
  args: ReadContractParameters<{
    asset: Address;
  }>,
) {
  try {
    try {
      const name = await client.readContract({
        ...readContractParameters(args),
        abi: parseAbi(["function name() view returns (string)"] as const),
        functionName: "name",
        address: args.asset,
      });

      return name;
    } catch (error) {
      if (error instanceof ContractFunctionExecutionError) {
        // TODO: Once `viem` exports the `SliceOutOfBoundsError` class, we should use that here too (`error.cause`).
        const name = await client.readContract({
          ...readContractParameters(args),
          abi: parseAbi(["function name() view returns (bytes32)"] as const),
          functionName: "name",
          address: args.asset,
        });

        return hexToString(name);
      }

      throw error;
    }
  } catch (error) {
    if (error instanceof ContractFunctionZeroDataError) {
      return "";
    }

    throw error;
  }
}
