import { Viem } from "@enzymefinance/sdk/Utils";
import { type Account, type Address, type WalletClient, parseAbi } from "viem";
import { simulateContract } from "viem/actions";

export function createOracleWithQuote(
  client: WalletClient,
  args: Viem.ContractCallParameters<{
    factory: Address;
    market: Address;
    twapDuration: number;
    baseOracleType: number;
    quoteOracle: Address;
    account?: Account;
  }>,
) {
  return simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    account: args.account,
    abi: parseAbi([
      "function createOracleWithQuote(address market, uint32 twapDuration, uint8 baseOracleType, address quoteOracle) external returns (address oracle)",
    ]),
    functionName: "createOracleWithQuote",
    address: args.factory,
    args: [args.market, args.twapDuration, args.baseOracleType, args.quoteOracle],
  });
}
