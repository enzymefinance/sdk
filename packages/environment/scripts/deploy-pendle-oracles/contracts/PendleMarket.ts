import { Viem } from "@enzymefinance/sdk/Utils";
import { type Account, type Address, type WalletClient, parseAbi } from "viem";
import { simulateContract } from "viem/actions";

export function increaseObservationsCardinalityNext(
  client: WalletClient,
  args: Viem.ContractCallParameters<{ market: Address; cardinalityNext: number; account?: Account }>,
) {
  return simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    account: args.account,
    abi: parseAbi(["function increaseObservationsCardinalityNext(uint16 cardinalityNext) external"]),
    functionName: "increaseObservationsCardinalityNext",
    address: args.market,
    args: [args.cardinalityNext],
  });
}
