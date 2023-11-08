import { type Address, type PublicClient } from "viem";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// TROVE MANAGER
//--------------------------------------------------------------------------------------------

const troveManagerAbi = [
  {
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
  },
  {
    inputs: [],
    name: "LUSD_GAS_COMPENSATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_LUSDDebt",
        type: "uint256",
      },
    ],
    name: "getBorrowingFeeWithDecay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getTrove(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    troveManager: Address;
    debtPosition: Address;
  }>,
) {
  const [debt, collateral, stake, status, arrayIndex] = await Viem.readContract(client, args, {
    abi: troveManagerAbi,
    functionName: "Troves",
    address: args.troveManager,
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

export async function getLusdGasCompensation(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    troveManager: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: troveManagerAbi,
    functionName: "LUSD_GAS_COMPENSATION",
    address: args.troveManager,
  });
}

export async function getBorrowingFeeWithDecay(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    troveManager: Address;
    lusdAmount: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: troveManagerAbi,
    functionName: "getBorrowingFeeWithDecay",
    address: args.troveManager,
    args: [args.lusdAmount],
  });
}

//--------------------------------------------------------------------------------------------
// SORTED TROVES
//--------------------------------------------------------------------------------------------

const sortedTrovesAbi = [
  {
    inputs: [],
    name: "getSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_NICR",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_prevId",
        type: "address",
      },
      {
        internalType: "address",
        name: "_nextId",
        type: "address",
      },
    ],
    name: "findInsertPosition",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getSortedTrovesSize(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    sortedTroves: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: sortedTrovesAbi,
    functionName: "getSize",
    address: args.sortedTroves,
  });
}

export async function findInsertPosition(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    sortedTroves: Address;
    nicr: bigint;
    prevId: Address;
    nextId: Address;
  }>,
) {
  const [upperHint, lowerHint] = await Viem.readContract(client, args, {
    abi: sortedTrovesAbi,
    functionName: "findInsertPosition",
    address: args.sortedTroves,
    args: [args.nicr, args.prevId, args.nextId],
  });

  return { upperHint, lowerHint };
}

//--------------------------------------------------------------------------------------------
// HINT HELPERS
//--------------------------------------------------------------------------------------------

const hintHelpersAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_CR",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numTrials",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_inputRandomSeed",
        type: "uint256",
      },
    ],
    name: "getApproxHint",
    outputs: [
      {
        internalType: "address",
        name: "hintAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "diff",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "latestRandomSeed",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getApproxHint(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    hintHelpers: Address;
    nicr: bigint;
    numTrials: bigint;
    inputRandomSeed: bigint;
  }>,
) {
  const [hintAddress, diff, latestRandomSeed] = await Viem.readContract(client, args, {
    abi: hintHelpersAbi,
    functionName: "getApproxHint",
    address: args.hintHelpers,
    args: [args.nicr, args.numTrials, args.inputRandomSeed],
  });

  return { hintAddress, diff, latestRandomSeed };
}
