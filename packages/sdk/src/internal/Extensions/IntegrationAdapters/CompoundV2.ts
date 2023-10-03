import { Viem } from "@enzymefinance/sdk/Utils";
import * as IntegrationManager from "@enzymefinance/sdk/internal/IntegrationManager";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

const lendSelector = "0x099f7515"; // lend(address,bytes,bytes)
export const lend = IntegrationManager.makeUse(lendSelector, lendEncode);

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

const redeemSelector = "0xc29fa9dd"; // redeem(address,bytes,bytes)
export const redeem = IntegrationManager.makeUse(redeemSelector, redeemEncode);

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
// EXTERNAL CONTRACT METHODS
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
] as const;

export function getBorrowRatePerBlock(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cToken: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: cTokenAbi,
    functionName: "borrowRatePerBlock",
    address: args.cToken,
  });
}

export function getTotalSupply(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cToken: Address;
  }>,
) {
  return Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
    abi: compoundComptrollerAbi,
    functionName: "compBorrowSpeeds",
    address: args.compoundComptroller,
    args: [args.cToken],
  });
}

export function getMarkets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    compoundComptroller: Address;
    cToken: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: compoundComptrollerAbi,
    functionName: "markets",
    address: args.compoundComptroller,
    args: [args.cToken],
  });
}

export function getMintGuardianPaused(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    compoundComptroller: Address;
    cToken: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: compoundComptrollerAbi,
    functionName: "_mintGuardianPaused",
    address: args.compoundComptroller,
  });
}
