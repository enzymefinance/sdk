import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

const abi = {
  inputs: [
    {
      internalType: "address",
      name: "",
      type: "address"
    }
  ],
  name: "Troves",
  outputs: [
    {
      internalType: "uint256",
      name: "debt",
      type: "uint256"
    },
    {
      internalType: "uint256",
      name: "coll",
      type: "uint256"
    },
    {
      internalType: "uint256",
      name: "stake",
      type: "uint256"
    },
    {
      internalType: "enum TroveManager.Status",
      name: "status",
      type: "uint8"
    },
    {
      internalType: "uint128",
      name: "arrayIndex",
      type: "uint128"
    }
  ],
  stateMutability: "view",
  type: "function"
}

export type LiquityTrove = {
  debt: bigint;
  coll: bigint;
  stake: bigint;
  status: number;
  arrayIndex: bigint;
}

export function getLiquityTrove(
  client: PublicClient,
  args: ReadContractParameters<{
    liquityTroveManager: Address;
    debtPosition: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: [abi],
    functionName: "Troves",
    address: args.liquityTroveManager,
    args: [args.debtPosition],
  }) as unknown as Promise<LiquityTrove>;
}

export async function getLiquityTroves(
  client: PublicClient,
  args: ReadContractParameters<{
    liquityTroveManager: Address;
    debtPositions: [Address];
  }>,
) {
  const troves = await Promise.all(
    args.debtPositions.map(async (position) => {
      const trove = await getLiquityTrove(client, {
        ...args,
        debtPosition: position,
      });

      return { position, trove };
    }),
  );

  const troveMap: Record<Address, LiquityTrove> = {};
  for (const { position, trove } of troves) {
    troveMap[position] = trove;
  }

  return troveMap;
}
