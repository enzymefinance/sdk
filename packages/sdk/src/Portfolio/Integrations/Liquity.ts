import { type Address, Chain, type Hex, PublicClient, Transport, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  OpenTrove: 0n,
  AddCollateral: 1n,
  RemoveCollateral: 2n,
  Borrow: 3n,
  RepayBorrow: 4n,
  CloseTrove: 5n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// OPEN TROVE
//--------------------------------------------------------------------------------------------

export const openTrove = ExternalPositionManager.makeUse(Action.OpenTrove, openTroveEncode);
export const createAndOpenTrove = ExternalPositionManager.makeCreateAndUse(Action.OpenTrove, openTroveEncode);

const openTroveEncoding = [
  {
    name: "maxFeePercentage",
    type: "uint256",
  },
  {
    name: "collateralAmount",
    type: "uint256",
  },
  {
    name: "lusdAmount",
    type: "uint256",
  },
  {
    name: "upperHint",
    type: "address",
  },
  {
    name: "lowerHint",
    type: "address",
  },
] as const;

export type OpenTroveArgs = {
  collateralAmount: bigint;
  lusdAmount: bigint;
  maxFeePercentage: bigint;
  lowerHint: Address;
  upperHint: Address;
};

export function openTroveEncode(args: OpenTroveArgs): Hex {
  return encodeAbiParameters(openTroveEncoding, [
    args.maxFeePercentage,
    args.collateralAmount,
    args.lusdAmount,
    args.upperHint,
    args.lowerHint,
  ]);
}

export function openTroveDecode(encoded: Hex): OpenTroveArgs {
  const [maxFeePercentage, collateralAmount, lusdAmount, upperHint, lowerHint] = decodeAbiParameters(
    openTroveEncoding,
    encoded,
  );

  return {
    maxFeePercentage,
    collateralAmount,
    lusdAmount,
    upperHint,
    lowerHint,
  };
}

//--------------------------------------------------------------------------------------------
// ADD COLLATERAL
//--------------------------------------------------------------------------------------------

export const addCollateral = ExternalPositionManager.makeUse(Action.AddCollateral, addCollateralEncode);
export const createAndAddCollateral = ExternalPositionManager.makeCreateAndUse(
  Action.AddCollateral,
  addCollateralEncode,
);

const addCollateralEncoding = [
  {
    name: "collateralAmount",
    type: "uint256",
  },
  {
    name: "upperHint",
    type: "address",
  },
  {
    name: "lowerHint",
    type: "address",
  },
] as const;

export type AddCollateralArgs = {
  collateralAmount: bigint;
  lowerHint: Address;
  upperHint: Address;
};

export function addCollateralEncode(args: AddCollateralArgs): Hex {
  return encodeAbiParameters(addCollateralEncoding, [args.collateralAmount, args.upperHint, args.lowerHint]);
}

export function addCollateralDecode(encoded: Hex): AddCollateralArgs {
  const [collateralAmount, upperHint, lowerHint] = decodeAbiParameters(addCollateralEncoding, encoded);

  return {
    collateralAmount,
    upperHint,
    lowerHint,
  };
}

//--------------------------------------------------------------------------------------------
// REMOVE COLLATERAL
//--------------------------------------------------------------------------------------------

export const removeCollateral = ExternalPositionManager.makeUse(Action.RemoveCollateral, removeCollateralEncode);

const removeCollateralEncoding = [
  {
    name: "collateralAmount",
    type: "uint256",
  },
  {
    name: "upperHint",
    type: "address",
  },
  {
    name: "lowerHint",
    type: "address",
  },
] as const;

export type RemoveCollateralArgs = {
  collateralAmount: bigint;
  lowerHint: Address;
  upperHint: Address;
};

export function removeCollateralEncode(args: RemoveCollateralArgs): Hex {
  return encodeAbiParameters(removeCollateralEncoding, [args.collateralAmount, args.upperHint, args.lowerHint]);
}

export function removeCollateralDecode(encoded: Hex): RemoveCollateralArgs {
  const [collateralAmount, upperHint, lowerHint] = decodeAbiParameters(removeCollateralEncoding, encoded);

  return {
    collateralAmount,
    upperHint,
    lowerHint,
  };
}

//--------------------------------------------------------------------------------------------
// BORROW
//--------------------------------------------------------------------------------------------

export const borrow = ExternalPositionManager.makeUse(Action.Borrow, borrowEncode);
export const createAndBorrow = ExternalPositionManager.makeCreateAndUse(Action.Borrow, borrowEncode);

const borrowEncoding = [
  {
    name: "lusdAmount",
    type: "uint256",
  },
  {
    name: "maxFeePercentage",
    type: "uint256",
  },
  {
    name: "upperHint",
    type: "address",
  },
  {
    name: "lowerHint",
    type: "address",
  },
] as const;

export type BorrowArgs = {
  lusdAmount: bigint;
  maxFeePercentage: bigint;
  lowerHint: Address;
  upperHint: Address;
};

export function borrowEncode(args: BorrowArgs): Hex {
  return encodeAbiParameters(borrowEncoding, [args.maxFeePercentage, args.lusdAmount, args.upperHint, args.lowerHint]);
}

export function borrowDecode(encoded: Hex): BorrowArgs {
  const [maxFeePercentage, lusdAmount, upperHint, lowerHint] = decodeAbiParameters(borrowEncoding, encoded);

  return {
    maxFeePercentage,
    lusdAmount,
    upperHint,
    lowerHint,
  };
}

//--------------------------------------------------------------------------------------------
// REPAY BORROW
//--------------------------------------------------------------------------------------------

export const repayBorrow = ExternalPositionManager.makeUse(Action.RepayBorrow, repayBorrowEncode);

const repayBorrowEncoding = [
  {
    name: "lusdAmount",
    type: "uint256",
  },
  {
    name: "upperHint",
    type: "address",
  },
  {
    name: "lowerHint",
    type: "address",
  },
] as const;

export type RepayBorrowArgs = {
  lusdAmount: bigint;
  lowerHint: Address;
  upperHint: Address;
};

export function repayBorrowEncode(args: RepayBorrowArgs): Hex {
  return encodeAbiParameters(repayBorrowEncoding, [args.lusdAmount, args.upperHint, args.lowerHint]);
}

export function repayBorrowDecode(encoded: Hex): RepayBorrowArgs {
  const [lusdAmount, upperHint, lowerHint] = decodeAbiParameters(repayBorrowEncoding, encoded);

  return {
    lusdAmount,
    upperHint,
    lowerHint,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - TROVE MANAGER
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

export async function getTrove<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
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

export async function getLusdGasCompensation<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
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

export async function getBorrowingFeeWithDecay<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
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
// EXTERNAL READ FUNCTIONS - SORTED TROVES
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

export function getSortedTrovesSize<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
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

export async function findInsertPosition<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
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
// EXTERNAL READ FUNCTIONS - HINT HELPERS
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

export async function getApproxHint<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
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
