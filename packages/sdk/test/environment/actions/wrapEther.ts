import { Utils } from "@enzymefinance/sdk";
import { TestEnvironment } from "@enzymefinance/sdk/test";
import { type Address, Chain, parseAbi } from "viem";

export async function wrapEther<TChain extends Chain>({
  account,
  amount,
  environment,
}: {
  environment: TestEnvironment<TChain>;
  account: Address;
  amount: bigint;
}) {
  await environment.send({
    account,
    transaction: new Utils.Viem.PopulatedTransaction({
      abi: parseAbi(["function deposit() payable"] as const),
      functionName: "deposit",
      value: amount,
      address: (environment as any).constants.weth as Address,
    }),
  });
}
