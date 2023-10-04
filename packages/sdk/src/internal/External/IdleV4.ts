import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient } from "viem";

const getGovTokensAmountsAbi = [
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

export async function getGovTokensAmounts(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
    tokensOwner: Address;
  }>,
) {
  const amounts = await Viem.readContract(client, args, {
    abi: getGovTokensAmountsAbi,
    functionName: "getGovTokensAmounts",
    address: args.pool,
    args: [args.tokensOwner],
  });

  const tokensAmounts = await Promise.all(
    amounts.map(async (amount, index) => {
      const token = await Viem.readContract(client, args, {
        abi: getGovTokensAmountsAbi,
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

const idleSpeedsAbi = {
  inputs: [{ internalType: "address", name: "", type: "address" }],
  name: "idleSpeeds",
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export function getSpeeds(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    idleController: Address;
    idlePool: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: [idleSpeedsAbi],
    functionName: "idleSpeeds",
    address: args.idleController,
    args: [args.idlePool],
  });
}
