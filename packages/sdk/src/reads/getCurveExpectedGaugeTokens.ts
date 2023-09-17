import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, type PublicClient, parseAbi } from "viem";

export async function getCurveExpectedGaugeTokens(
  client: PublicClient,
  args: ReadContractParameters<{
    curvePool: Address;
    tokenAmounts: bigint[];
    isDeposit: boolean;
  }>,
) {
  const abi = parseAbi([
    `function calc_token_amount(uint256[${args.tokenAmounts.length}] _amounts, bool _is_deposit) returns (uint256)`,
  ] as const);

  const { result } = await client.simulateContract({
    ...readContractParameters(args),
    abi,
    functionName: "calc_token_amount",
    address: args.curvePool,
    args: [args.tokenAmounts, args.isDeposit],
  });

  return result;
}
