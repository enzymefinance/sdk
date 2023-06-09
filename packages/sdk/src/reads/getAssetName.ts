import {
  type Address,
  ContractFunctionExecutionError,
  ContractFunctionZeroDataError,
  type PublicClient,
  hexToString,
  parseAbi,
} from "viem";
import { readContract } from "viem/contract";

export async function getAssetName(
  client: PublicClient,
  {
    asset,
  }: {
    asset: Address;
  },
) {
  try {
    try {
      const name = await readContract(client, {
        abi: parseAbi(["function name() view returns (string)"] as const),
        functionName: "name",
        address: asset,
      });

      return name;
    } catch (error) {
      if (error instanceof ContractFunctionExecutionError) {
        // TODO: Once `viem` exports the `SliceOutOfBoundsError` class, we should use that here too (`error.cause`).
        const name = await readContract(client, {
          abi: parseAbi(["function name() view returns (bytes32)"] as const),
          functionName: "name",
          address: asset,
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
