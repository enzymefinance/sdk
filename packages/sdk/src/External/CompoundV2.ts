import { type Address, type PublicClient } from "viem";
import { Viem } from "../Utils.js";

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
  return Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
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

export async function getMarkets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    compoundComptroller: Address;
    cToken: Address;
  }>,
) {
  const [isListed, collateralFactorMantissa, isComped] = await Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
    abi: compoundComptrollerAbi,
    functionName: "_mintGuardianPaused",
    address: args.compoundComptroller,
  });
}
