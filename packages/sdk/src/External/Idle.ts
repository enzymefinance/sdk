import { type Address, type PublicClient, parseAbi } from "viem";
import { Viem } from "../Utils.js";

export async function getGovTokensAmounts(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
    tokensOwner: Address;
  }>,
) {
  const amounts = await Viem.readContract(client, args, {
    abi: parseAbi(["function getGovTokensAmounts(address _usr) view returns (uint256[] _amounts)"]),
    functionName: "getGovTokensAmounts",
    address: args.pool,
    args: [args.tokensOwner],
  });

  const govTokensAbi = parseAbi(["function govTokens(uint256) view returns (address)"]);

  const tokensAmounts = await Promise.all(
    amounts.map(async (amount, index) => {
      const token = await Viem.readContract(client, args, {
        abi: govTokensAbi,
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

export function getSpeeds(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    idleController: Address;
    idlePool: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function idleSpeeds(address) view returns (uint256)"]),
    functionName: "idleSpeeds",
    address: args.idleController,
    args: [args.idlePool],
  });
}
