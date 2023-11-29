import { type Address, type Hex, PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

const lendSelector = "0x099f7515"; // lend(address,bytes,bytes)
export const lend = IntegrationManager.makeUse(lendSelector, lendEncode);

const lendEncoding = [
  {
    type: "address",
    name: "arrakisVault",
  },
  {
    name: "maxUnderlyingAmounts",
    type: "uint256[2]",
  },
  {
    name: "sharesAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  arrakisVault: Address;
  maxUnderlyingAmounts: Readonly<[bigint, bigint]>;
  sharesAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.arrakisVault, args.maxUnderlyingAmounts, args.sharesAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [arrakisVault, maxUnderlyingAmounts, sharesAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    arrakisVault,
    maxUnderlyingAmounts,
    sharesAmount,
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
    name: "arrakisVault",
  },
  {
    name: "sharesAmount",
    type: "uint256",
  },
  {
    name: "minIncomingUnderlyingAmounts",
    type: "uint256[2]",
  },
] as const;

export type RedeemArgs = {
  arrakisVault: Address;
  sharesAmount: bigint;
  minIncomingUnderlyingAmounts: Readonly<[bigint, bigint]>;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.arrakisVault, args.sharesAmount, args.minIncomingUnderlyingAmounts]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [arrakisVault, sharesAmount, minIncomingUnderlyingAmounts] = decodeAbiParameters(redeemEncoding, encoded);

  return {
    arrakisVault,
    sharesAmount,
    minIncomingUnderlyingAmounts,
  };
}

//--------------------------------------------------------------------------------------------
// THIRD PARTY READ FUNCTIONS
//--------------------------------------------------------------------------------------------

const resolverAbi = [
  {
    inputs: [
      { internalType: "contract IArrakisV2", name: "vaultV2_", type: "address" },
      { internalType: "uint256", name: "amount0Max_", type: "uint256" },
      { internalType: "uint256", name: "amount1Max_", type: "uint256" },
    ],
    name: "getMintAmounts",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
      { internalType: "uint256", name: "mintAmount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getMintAmounts(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    resolver: Address;
    arrakisVault: Address;
    amount0Max: bigint;
    amount1Max: bigint;
  }>,
) {
  const [amount0, amount1, mintAmount] = await Viem.readContract(client, args, {
    abi: resolverAbi,
    functionName: "getMintAmounts",
    address: args.resolver,
    args: [args.arrakisVault, args.amount0Max, args.amount1Max],
  });

  return {
    amount0,
    amount1,
    mintAmount,
  };
}

const helperAbi = [
  {
    inputs: [{ internalType: "contract IArrakisV2", name: "vault_", type: "address" }],
    name: "totalUnderlying",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function totalUnderlying(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    helper: Address;
    arrakisVault: Address;
  }>,
) {
  const [amount0, amount1] = await Viem.readContract(client, args, {
    abi: helperAbi,
    functionName: "totalUnderlying",
    address: args.helper,
    args: [args.arrakisVault],
  });

  return {
    amount0,
    amount1,
  };
}

const vaultAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "burnAmount_", type: "uint256" },
      { internalType: "address", name: "receiver_", type: "address" },
    ],
    name: "burn",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "init0",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "init1",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRanges",
    outputs: [
      {
        components: [
          { internalType: "int24", name: "lowerTick", type: "int24" },
          { internalType: "int24", name: "upperTick", type: "int24" },
          { internalType: "uint24", name: "feeTier", type: "uint24" },
        ],
        internalType: "struct Range[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function burn(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    arrakisVault: Address;
    receiver: Address;
    burnAmount: bigint;
    account: Address;
  }>,
) {
  const {
    result: [amount0, amount1],
  } = await Viem.simulateContract(client, args, {
    abi: vaultAbi,
    functionName: "burn",
    address: args.arrakisVault,
    args: [args.burnAmount, args.receiver],
    account: args.account,
  });

  return {
    amount0,
    amount1,
  };
}

export async function inits(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    arrakisVault: Address;
  }>,
) {
  const [init0, init1] = await Promise.all([
    Viem.readContract(client, args, {
      abi: vaultAbi,
      functionName: "init0",
      address: args.arrakisVault,
    }),
    Viem.readContract(client, args, {
      abi: vaultAbi,
      functionName: "init1",
      address: args.arrakisVault,
    }),
  ]);

  return {
    init0,
    init1,
  };
}

export async function numberOfRanges(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    arrakisVault: Address;
  }>,
) {
  const ranges = await Viem.readContract(client, args, {
    abi: vaultAbi,
    functionName: "getRanges",
    address: args.arrakisVault,
  });

  return ranges.length;
}
