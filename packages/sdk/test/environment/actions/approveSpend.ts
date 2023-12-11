import { Utils } from "@enzymefinance/sdk";
import { type TestEnvironment } from "@enzymefinance/sdk/test";
import { type Address, Chain, parseAbi } from "viem";

export async function approveSpend<TChain extends Chain | undefined = Chain>({
  token,
  account,
  spender,
  amount,
  environment,
}: {
  token: Address;
  account: Address;
  spender: Address;
  amount: bigint;
  environment: TestEnvironment<TChain>;
}) {
  await environment.send({
    account: account,
    transaction: new Utils.Viem.PopulatedTransaction({
      functionName: "approve",
      abi: parseAbi(["function approve(address spender, uint256 amount) returns (bool)"] as const),
      address: token,
      args: [spender, amount],
    }),
  });
}
