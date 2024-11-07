import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  Lend: 0n,
  Redeem: 1n,
  AddCollateral: 2n,
  RemoveCollateral: 3n,
  Borrow: 4n,
  Repay: 5n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = ExternalPositionManager.makeUse(Action.Lend, lendEncode);

export const createAndLend = ExternalPositionManager.makeCreateAndUse(Action.Lend, lendEncode);

const lendEncoding = [
  {
    name: "marketId",
    type: "bytes32",
  },
  {
    name: "lendAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  marketId: Hex;
  lendAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.marketId, args.lendAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [marketId, lendAmount] = decodeAbiParameters(lendEncoding, encoded);

  return { marketId, lendAmount };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = ExternalPositionManager.makeUse(Action.Redeem, redeemEncode);

const redeemEncoding = [
  {
    name: "marketId",
    type: "bytes32",
  },
  {
    name: "sharesAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  marketId: Hex;
  sharesAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.marketId, args.sharesAmount]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [marketId, sharesAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return {
    marketId,
    sharesAmount,
  };
}

//--------------------------------------------------------------------------------------------
// ADD COLLATERAL
//--------------------------------------------------------------------------------------------

export const addCollateral = ExternalPositionManager.makeUse(Action.AddCollateral, addCollateralEncode);

const addCollateralEncoding = [
  {
    name: "marketId",
    type: "bytes32",
  },
  {
    name: "collateralAmount",
    type: "uint256",
  },
] as const;

export type AddCollateralArgs = {
  marketId: Hex;
  collateralAmount: bigint;
};

export function addCollateralEncode(args: AddCollateralArgs): Hex {
  return encodeAbiParameters(addCollateralEncoding, [args.marketId, args.collateralAmount]);
}

export function addCollateralDecode(encoded: Hex): AddCollateralArgs {
  const [marketId, collateralAmount] = decodeAbiParameters(addCollateralEncoding, encoded);

  return {
    marketId,
    collateralAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REMOVE COLLATERAL
//--------------------------------------------------------------------------------------------

export const removeCollateral = ExternalPositionManager.makeUse(Action.RemoveCollateral, removeCollateralEncode);

const removeCollateralEncoding = [
  {
    name: "marketId",
    type: "bytes32",
  },
  {
    name: "collateralAmount",
    type: "uint256",
  },
] as const;

export type RemoveCollateralArgs = {
  marketId: Hex;
  collateralAmount: bigint;
};

export function removeCollateralEncode(args: RemoveCollateralArgs): Hex {
  return encodeAbiParameters(removeCollateralEncoding, [args.marketId, args.collateralAmount]);
}

export function removeCollateralDecode(encoded: Hex): RemoveCollateralArgs {
  const [marketId, collateralAmount] = decodeAbiParameters(removeCollateralEncoding, encoded);

  return {
    marketId,
    collateralAmount,
  };
}

//--------------------------------------------------------------------------------------------
// BORROW
//--------------------------------------------------------------------------------------------

export const borrow = ExternalPositionManager.makeUse(Action.Borrow, borrowEncode);

const borrowEncoding = [
  {
    name: "marketId",
    type: "bytes32",
  },
  {
    name: "borrowAmount",
    type: "uint256",
  },
] as const;

export type BorrowArgs = {
  marketId: Hex;
  borrowAmount: bigint;
};

export function borrowEncode(args: BorrowArgs): Hex {
  return encodeAbiParameters(borrowEncoding, [args.marketId, args.borrowAmount]);
}

export function borrowDecode(encoded: Hex): BorrowArgs {
  const [marketId, borrowAmount] = decodeAbiParameters(borrowEncoding, encoded);

  return {
    marketId,
    borrowAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REPAY
//--------------------------------------------------------------------------------------------

export const repay = ExternalPositionManager.makeUse(Action.Repay, repayEncode);

const repayEncoding = [
  {
    name: "marketId",
    type: "bytes32",
  },
  {
    name: "repayAmount",
    type: "uint256",
  },
] as const;

export type RepayArgs = {
  marketId: Hex;
  repayAmount: bigint;
};

export function repayEncode(args: RepayArgs): Hex {
  return encodeAbiParameters(repayEncoding, [args.marketId, args.repayAmount]);
}

export function repayDecode(encoded: Hex): RepayArgs {
  const [marketId, repayAmount] = decodeAbiParameters(repayEncoding, encoded);

  return {
    marketId,
    repayAmount,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

const morphoBlueAbi = [
  {
    type: "function",
    name: "idToMarketParams",
    inputs: [
      {
        name: "_id",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "marketParams_",
        type: "tuple",
        internalType: "struct IMorphoBlue.MarketParams",
        components: [
          {
            name: "loanToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "oracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "irm",
            type: "address",
            internalType: "address",
          },
          {
            name: "lltv",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "market",
    inputs: [
      {
        name: "_id",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "market_",
        type: "tuple",
        internalType: "struct IMorphoBlue.Market",
        components: [
          {
            name: "totalSupplyAssets",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "totalSupplyShares",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "totalBorrowAssets",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "totalBorrowShares",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "lastUpdate",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "fee",
            type: "uint128",
            internalType: "uint128",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "position",
    inputs: [
      {
        name: "_id",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "position_",
        type: "tuple",
        internalType: "struct IMorphoBlue.Position",
        components: [
          {
            name: "supplyShares",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "borrowShares",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "collateral",
            type: "uint128",
            internalType: "uint128",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
] as const;

export function getMarketParamsFromId(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    morphoBlue: Address;
    marketId: Hex;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: morphoBlueAbi,
    functionName: "idToMarketParams",
    address: args.morphoBlue,
    args: [args.marketId],
  });
}

export function getMarket(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    morphoBlue: Address;
    marketId: Hex;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: morphoBlueAbi,
    functionName: "market",
    address: args.morphoBlue,
    args: [args.marketId],
  });
}

export function getPosition(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    morphoBlue: Address;
    marketId: Hex;
    user: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: morphoBlueAbi,
    functionName: "position",
    address: args.morphoBlue,
    args: [args.marketId, args.user],
  });
}
