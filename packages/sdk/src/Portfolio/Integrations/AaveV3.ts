import { type Address, Chain, type Hex, PublicClient, Transport, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = IntegrationManager.makeUse(IntegrationManager.Selector.Lend, lendEncode);

const lendEncoding = [
  {
    type: "address",
    name: "aToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  aToken: Address;
  depositAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.aToken, args.depositAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [aToken, depositAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    aToken,
    depositAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

const redeemEncoding = [
  {
    type: "address",
    name: "aToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  aToken: Address;
  redeemAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.aToken, args.redeemAmount]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [aToken, redeemAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return { aToken, redeemAmount };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL POSITION
//--------------------------------------------------------------------------------------------

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  AddCollateral: 0n,
  RemoveCollateral: 1n,
  Borrow: 2n,
  RepayBorrow: 3n,
  SetEMode: 4n,
  SetUseReserveAsCollateral: 5n,
} as const;

export const create = ExternalPositionManager.createOnly;

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
    name: "aTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
  {
    name: "fromUnderlying",
    type: "bool",
  },
] as const;

export type AddCollateralArgs = {
  aTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
  fromUnderlying: boolean;
};

export function addCollateralEncode(args: AddCollateralArgs): Hex {
  return encodeAbiParameters(addCollateralEncoding, [args.aTokens, args.amounts, args.fromUnderlying]);
}

export function addCollateralDecode(encoded: Hex): AddCollateralArgs {
  const [aTokens, amounts, fromUnderlying] = decodeAbiParameters(addCollateralEncoding, encoded);

  return {
    aTokens,
    amounts,
    fromUnderlying,
  };
}

//--------------------------------------------------------------------------------------------
// REMOVE COLLATERAL
//--------------------------------------------------------------------------------------------

export const removeCollateral = ExternalPositionManager.makeUse(Action.RemoveCollateral, removeCollateralEncode);

const removeCollateralEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
  {
    name: "toUnderlying",
    type: "bool",
  },
] as const;

export type RemoveCollateralArgs = {
  aTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
  toUnderlying: boolean;
};

export function removeCollateralEncode(args: RemoveCollateralArgs): Hex {
  return encodeAbiParameters(removeCollateralEncoding, [args.aTokens, args.amounts, args.toUnderlying]);
}

export function removeCollateralDecode(encoded: Hex): RemoveCollateralArgs {
  const [aTokens, amounts, toUnderlying] = decodeAbiParameters(removeCollateralEncoding, encoded);

  return {
    aTokens,
    amounts,
    toUnderlying,
  };
}

//--------------------------------------------------------------------------------------------
// BORROW
//--------------------------------------------------------------------------------------------

export const borrow = ExternalPositionManager.makeUse(Action.Borrow, borrowEncode);
export const createAndBorrow = ExternalPositionManager.makeCreateAndUse(Action.Borrow, borrowEncode);

const borrowEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type BorrowArgs = {
  underlyingTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
};

export function borrowEncode(args: BorrowArgs): Hex {
  return encodeAbiParameters(borrowEncoding, [args.underlyingTokens, args.amounts]);
}

export function borrowDecode(encoded: Hex): BorrowArgs {
  const [underlyingTokens, amounts] = decodeAbiParameters(borrowEncoding, encoded);

  return {
    underlyingTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// REPAY BORROW
//--------------------------------------------------------------------------------------------

export const repayBorrow = ExternalPositionManager.makeUse(Action.RepayBorrow, repayBorrowEncode);

const repayBorrowEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type RepayBorrowArgs = {
  underlyingTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
};

export function repayBorrowEncode(args: RepayBorrowArgs): Hex {
  return encodeAbiParameters(repayBorrowEncoding, [args.underlyingTokens, args.amounts]);
}

export function repayBorrowDecode(encoded: Hex): RepayBorrowArgs {
  const [underlyingTokens, amounts] = decodeAbiParameters(repayBorrowEncoding, encoded);

  return {
    underlyingTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// SET E-MODE
//--------------------------------------------------------------------------------------------

export const setEMode = ExternalPositionManager.makeUse(Action.SetEMode, setEModeEncode);

const setEModeEncoding = [
  {
    name: "categoryId",
    type: "uint8",
  },
] as const;

export type SetEModeArgs = {
  categoryId: number;
};

export function setEModeEncode(args: SetEModeArgs): Hex {
  return encodeAbiParameters(setEModeEncoding, [args.categoryId]);
}

export function setEModeDecode(encoded: Hex): SetEModeArgs {
  const [categoryId] = decodeAbiParameters(setEModeEncoding, encoded);

  return {
    categoryId,
  };
}

//--------------------------------------------------------------------------------------------
// SET USE RESERVE AS COLLATERAL
//--------------------------------------------------------------------------------------------

export const setUseReserveAsCollateral = ExternalPositionManager.makeUse(
  Action.SetUseReserveAsCollateral,
  setUseReserveAsCollateralEncode,
);

const setUseReserveAsCollateralEncoding = [
  {
    name: "underlying",
    type: "address",
  },
  {
    name: "useAsCollateral",
    type: "bool",
  },
] as const;

export type SetUseReserveAsCollateralArgs = {
  underlying: Address;
  useAsCollateral: boolean;
};

export function setUseReserveAsCollateralEncode(args: SetUseReserveAsCollateralArgs): Hex {
  return encodeAbiParameters(setUseReserveAsCollateralEncoding, [args.underlying, args.useAsCollateral]);
}

export function setUseReserveAsCollateralDecode(encoded: Hex): SetUseReserveAsCollateralArgs {
  const [underlying, useAsCollateral] = decodeAbiParameters(setUseReserveAsCollateralEncoding, encoded);

  return {
    underlying,
    useAsCollateral,
  };
}

//--------------------------------------------------------------------------------------------
// THIRD PARTY READ FUNCTIONS
//--------------------------------------------------------------------------------------------

const poolAddressProviderAbi = [
  {
    inputs: [],
    name: "getPool",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getPool<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    poolAddressProvider: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: poolAddressProviderAbi,
    functionName: "getPool",
    address: args.poolAddressProvider,
  });
}

const poolAbi = [
  {
    inputs: [{ internalType: "uint8", name: "id", type: "uint8" }],
    name: "getEModeCategoryData",
    outputs: [
      {
        components: [
          { internalType: "uint16", name: "ltv", type: "uint16" },
          { internalType: "uint16", name: "liquidationThreshold", type: "uint16" },
          { internalType: "uint16", name: "liquidationBonus", type: "uint16" },
          { internalType: "address", name: "priceSource", type: "address" },
          { internalType: "string", name: "label", type: "string" },
        ],
        internalType: "struct DataTypes.EModeCategory",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getEModeCategoryData<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    pool: Address;
    categoryId: number;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: poolAbi,
    functionName: "getEModeCategoryData",
    address: args.pool,
    args: [args.categoryId],
  });
}
