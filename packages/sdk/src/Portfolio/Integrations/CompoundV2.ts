import * as Abis from "@enzymefinance/abis";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract } from "viem/actions";
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
    name: "cToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
  {
    name: "minCTokenAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  cToken: Address;
  depositAmount: bigint;
  minCTokenAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.cToken, args.depositAmount, args.minCTokenAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [cToken, depositAmount, minCTokenAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    cToken,
    depositAmount,
    minCTokenAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

const redeemEncoding = [
  {
    type: "address",
    name: "cToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
  {
    name: "minUnderlyingAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  cToken: Address;
  redeemAmount: bigint;
  minUnderlyingAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.cToken, args.redeemAmount, args.minUnderlyingAmount]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [cToken, redeemAmount, minUnderlyingAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return { cToken, redeemAmount, minUnderlyingAmount };
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
  ClaimComp: 4n,
} as const;

const commonEncoding = [
  {
    name: "tokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
  {
    name: "data",
    type: "bytes",
  },
] as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// ADD COLLATERAL
//--------------------------------------------------------------------------------------------

export const addCollateral = ExternalPositionManager.makeUse(Action.AddCollateral, addCollateralEncode);
export const createAndAddCollateral = ExternalPositionManager.makeCreateAndUse(
  Action.AddCollateral,
  addCollateralEncode,
);

export type AddCollateralArgs = {
  cTokens: readonly Address[];
  amounts: readonly bigint[];
};

export function addCollateralEncode(args: AddCollateralArgs): Hex {
  return encodeAbiParameters(commonEncoding, [args.cTokens, args.amounts, "0x"]);
}

export function addCollateralDecode(encoded: Hex): AddCollateralArgs {
  const [cTokens, amounts] = decodeAbiParameters(commonEncoding, encoded);

  return {
    cTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// REMOVE COLLATERAL
//--------------------------------------------------------------------------------------------

export const removeCollateral = ExternalPositionManager.makeUse(Action.RemoveCollateral, removeCollateralEncode);

export type RemoveCollateralArgs = AddCollateralArgs;

export function removeCollateralEncode(args: RemoveCollateralArgs): Hex {
  return encodeAbiParameters(commonEncoding, [args.cTokens, args.amounts, "0x"]);
}

export function removeCollateralDecode(encoded: Hex): RemoveCollateralArgs {
  const [cTokens, amounts] = decodeAbiParameters(commonEncoding, encoded);

  return {
    cTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// BORROW
//--------------------------------------------------------------------------------------------

export const borrow = ExternalPositionManager.makeUse(Action.Borrow, borrowEncode);
export const createAndBorrow = ExternalPositionManager.makeCreateAndUse(Action.Borrow, borrowEncode);

export type BorrowArgs = {
  cTokens: readonly Address[];
  amounts: readonly bigint[];
  underlyingTokens: readonly Address[];
};

const dataEncoding = [{ name: "cTokens", type: "address[]" }] as const;

export function borrowEncode(args: BorrowArgs): Hex {
  const data = encodeAbiParameters(dataEncoding, [args.cTokens]);
  return encodeAbiParameters(commonEncoding, [args.underlyingTokens, args.amounts, data]);
}

export function borrowDecode(encoded: Hex): BorrowArgs {
  const [underlyingTokens, amounts, data] = decodeAbiParameters(commonEncoding, encoded);
  const [cTokens] = decodeAbiParameters(dataEncoding, data);

  return {
    underlyingTokens,
    amounts,
    cTokens,
  };
}

//--------------------------------------------------------------------------------------------
// REPAY BORROW
//--------------------------------------------------------------------------------------------

export const repayBorrow = ExternalPositionManager.makeUse(Action.RepayBorrow, repayBorrowEncode);

export type RepayBorrowArgs = BorrowArgs;

export function repayBorrowEncode(args: RepayBorrowArgs): Hex {
  const data = encodeAbiParameters(dataEncoding, [args.cTokens]);
  return encodeAbiParameters(commonEncoding, [args.underlyingTokens, args.amounts, data]);
}

export function repayBorrowDecode(encoded: Hex): RepayBorrowArgs {
  const [underlyingTokens, amounts, data] = decodeAbiParameters(commonEncoding, encoded);
  const [cTokens] = decodeAbiParameters(dataEncoding, data);

  return {
    underlyingTokens,
    cTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM COMP
//--------------------------------------------------------------------------------------------

export const claimComp = ExternalPositionManager.makeUse(Action.ClaimComp);

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export function getCTokenFromBorrowedAsset(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    externalPositionProxy: Address;
    borrowedAsset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ICompoundDebtPositionLib,
    functionName: "getCTokenFromBorrowedAsset",
    address: args.externalPositionProxy,
    args: [args.borrowedAsset],
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function claimCompFromCompoundV2Comptroller(args: {
  compoundV2Comptroller: Address;
  vaultProxy: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: parseAbi(["function claimComp(address)"]),
    functionName: "claimComp",
    address: args.compoundV2Comptroller,
    args: [args.vaultProxy],
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

const cTokenAbi = [
  {
    inputs: [],
    name: "borrowRatePerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supplyRatePerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBorrows",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangeRateStored",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

const compoundComptrollerAbi = [
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "compSupplySpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "compBorrowSpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "markets",
    outputs: [
      { internalType: "bool", name: "isListed", type: "bool" },
      { internalType: "uint256", name: "collateralFactorMantissa", type: "uint256" },
      { internalType: "bool", name: "isComped", type: "bool" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_mintGuardianPaused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "compAccrued",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
] as const;

export interface Market {
  isListed: boolean;
  collateralFactorMantissa: bigint;
  isComped: boolean;
}

export function getBorrowRatePerBlock(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cTokenAbi,
    functionName: "borrowRatePerBlock",
    address: args.cToken,
  });
}

export function getSupplyRatePerBlock(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cTokenAbi,
    functionName: "supplyRatePerBlock",
    address: args.cToken,
  });
}

export function getTotalSupply(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cTokenAbi,
    functionName: "totalSupply",
    address: args.cToken,
  });
}

export function getTotalBorrows(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cTokenAbi,
    functionName: "totalBorrows",
    address: args.cToken,
  });
}

export function getExchangeRateStored(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cTokenAbi,
    functionName: "exchangeRateStored",
    address: args.cToken,
  });
}

export function getBalanceOf(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cToken: Address;
    account: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cTokenAbi,
    functionName: "balanceOf",
    address: args.cToken,
    args: [args.account],
  });
}

export function getCompSupplySpeeds(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    compoundComptroller: Address;
    cToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: compoundComptrollerAbi,
    functionName: "compSupplySpeeds",
    address: args.compoundComptroller,
    args: [args.cToken],
  });
}

export function getCompBorrowSpeeds(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    compoundComptroller: Address;
    cToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: compoundComptrollerAbi,
    functionName: "compBorrowSpeeds",
    address: args.compoundComptroller,
    args: [args.cToken],
  });
}

export async function getMarkets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    compoundComptroller: Address;
    cToken: Address;
  }>,
) {
  const [isListed, collateralFactorMantissa, isComped] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: compoundComptrollerAbi,
    functionName: "markets",
    address: args.compoundComptroller,
    args: [args.cToken],
  });

  return { isListed, collateralFactorMantissa, isComped };
}

export function getMintGuardianPaused(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    compoundComptroller: Address;
    cToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: compoundComptrollerAbi,
    functionName: "_mintGuardianPaused",
    address: args.compoundComptroller,
  });
}

export function getCompAccrued(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    compoundComptroller: Address;
    account: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: compoundComptrollerAbi,
    functionName: "compAccrued",
    address: args.compoundComptroller,
    args: [args.account],
  });
}
