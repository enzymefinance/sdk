import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";

const abi = {
  name: "calc_withdraw_one_coin",
  outputs: [{ type: "uint256", name: "" }],
  inputs: [
    { type: "uint256", name: "_token_amount" },
    { type: "int128", name: "i" },
  ],
  constant: true,
  payable: false,
  type: "function",
} as const;

export async function doesCurvePoolAllowSingelAssetRedemption(
  client: PublicClient,
  args: ReadContractParameters<{
    pool: Address;
  }>,
) {
  const tokenAmount = 1n;
  const tokenIndex = 0n;

  try {
    await client.readContract({
      ...readContractParameters(args),
      abi: [abi],
      functionName: "calc_withdraw_one_coin",
      address: args.pool,
      args: [tokenAmount, tokenIndex],
    });

    return true;
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      return false;
    }
    throw error;
  }
}
