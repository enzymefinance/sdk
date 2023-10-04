import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient } from "viem";

const troveManagerAbi = {
  inputs: [
    {
      internalType: "address",
      name: "",
      type: "address",
    },
  ],
  name: "Troves",
  outputs: [
    {
      internalType: "uint256",
      name: "debt",
      type: "uint256",
    },
    {
      internalType: "uint256",
      name: "coll",
      type: "uint256",
    },
    {
      internalType: "uint256",
      name: "stake",
      type: "uint256",
    },
    {
      internalType: "enum TroveManager.Status",
      name: "status",
      type: "uint8",
    },
    {
      internalType: "uint128",
      name: "arrayIndex",
      type: "uint128",
    },
  ],
  stateMutability: "view",
  type: "function",
} as const;

type Trove = {
  debt: bigint;
  collateral: bigint;
  stake: bigint;
  status: number;
  arrayIndex: bigint;
};

export async function getTrove(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    liquityTroveManager: Address;
    debtPosition: Address;
  }>,
) {
  const [debt, collateral, stake, status, arrayIndex] = await Viem.readContract(client, args, {
    abi: [troveManagerAbi],
    functionName: "Troves",
    address: args.liquityTroveManager,
    args: [args.debtPosition],
  });

  return {
    debt,
    collateral,
    stake,
    status,
    arrayIndex,
  };
}

export async function getTroves(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    liquityTroveManager: Address;
    debtPositions: [Address];
  }>,
) {
  const troves = await Promise.all(
    args.debtPositions.map(async (position) => {
      const trove = await getTrove(client, {
        ...args,
        debtPosition: position,
      });

      return { position, trove };
    }),
  );

  const troveMap: Record<Address, Trove> = {};
  for (const { position, trove } of troves) {
    troveMap[position] = trove;
  }

  return troveMap;
}
