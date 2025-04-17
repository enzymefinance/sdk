import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type Client, parseAbi } from "viem";
import { readContract } from "viem/actions";

export async function getOracleState(
  client: Client,
  args: Viem.ContractCallParameters<{ oracle: Address; market: Address; duration: number }>,
) {
  const [increaseCardinalityRequired, cardinalityRequired, oldestObservationSatisfied] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi([
      "function getOracleState(address market, uint32 duration) external view returns (bool increaseCardinalityRequired, uint16 cardinalityRequired, bool oldestObservationSatisfied)",
    ]),
    functionName: "getOracleState",
    address: args.oracle,
    args: [args.market, args.duration],
  });

  return {
    increaseCardinalityRequired,
    cardinalityRequired,
    oldestObservationSatisfied,
  };
}
