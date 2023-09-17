import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

const abi = [
  {
    constant: true,
    inputs: [{ internalType: "address", name: "_usr", type: "address" }],
    name: "getGovTokensAmounts",
    outputs: [{ internalType: "uint256[]", name: "_amounts", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "govTokens",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getIdleGovTokensAmounts(
  client: PublicClient,
  args: ReadContractParameters<{
    pool: Address;
    tokensOwner: Address;
  }>,
) {
  const amounts = await client.readContract({
    ...readContractParameters(args),
    abi,
    functionName: "getGovTokensAmounts",
    address: args.pool,
    args: [args.tokensOwner],
  });

  const tokensAmounts = await Promise.all(
    amounts.map(async (amount, index) => {
      const token = await client.readContract({
        ...readContractParameters(args),
        abi,
        functionName: "govTokens",
        address: args.pool,
        args: [BigInt(index)],
      });

      return {
        amount,
        token,
      };
    }),
  );

  const tokensAmountsMap: Record<Address, bigint> = {};
  for (const { token, amount } of tokensAmounts) {
    tokensAmountsMap[token] = amount;
  }

  return tokensAmountsMap;
}
