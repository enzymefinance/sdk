import * as ExternalPositionManager from "@enzymefinance/sdk/internal/ExternalPositionManager";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Viem } from "../../../Utils";

export type Action = typeof Action[keyof typeof Action];
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
// EXTERNAL CONTRACT METHODS
//--------------------------------------------------------------------------------------------

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

export type LiquityTrove = {
  debt: bigint;
  collateral: bigint;
  stake: bigint;
  status: number;
  arrayIndex: bigint;
};

export async function getLiquityTrove(
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

export async function getLiquityTroves(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
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
