import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import {
  type Address,
  ContractFunctionExecutionError,
  ContractFunctionZeroDataError,
  type PublicClient,
  hexToString,
  parseAbi,
} from "viem";

export async function getAssetSymbol(
  client: PublicClient,
  args: ReadContractParameters<{
    asset: Address;
  }>,
) {
  try {
    try {
      const symbol = await client.readContract({
        ...readContractParameters(args),
        abi: parseAbi(["function symbol() view returns (string)"] as const),
        functionName: "symbol",
        address: args.asset,
      });

      return symbol;
    } catch (error) {
      if (error instanceof ContractFunctionExecutionError) {
        // TODO: Once `viem` exports the `SliceOutOfBoundsError` class, we should use that here too (`error.cause`).
        const symbol = await client.readContract({
          ...readContractParameters(args),
          abi: parseAbi(["function symbol() view returns (bytes32)"] as const),
          functionName: "symbol",
          address: args.asset,
        });

        return hexToString(symbol);
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
