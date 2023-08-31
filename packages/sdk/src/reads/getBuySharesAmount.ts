import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import type { Address, PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getBuySharesAmount(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    amount: bigint;
    buyer: Address;
  }>,
) {
  const { result } = await simulateContract(client, {
    ...readContractParameters(args),
    abi: IComptrollerLib,
    functionName: "buyShares",
    address: args.comptrollerProxy,
    args: [args.amount, 1n],
    account: args.buyer,
  });

  return result;
}
