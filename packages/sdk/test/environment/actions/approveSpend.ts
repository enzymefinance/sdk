import { Utils } from "@enzymefinance/sdk";
import type { TestEnvironment } from "@enzymefinance/sdk/test";
import { type Address, parseAbi } from "viem";

export async function approveSpend({
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
  environment: TestEnvironment;
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
