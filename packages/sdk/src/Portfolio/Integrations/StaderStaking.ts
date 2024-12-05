import { type Address, type Client, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// INTEGRATION - WRAP
//--------------------------------------------------------------------------------------------

export const wrap = IntegrationManager.makeUse(IntegrationManager.Selector.Wrap, wrapEncode);

const wrapEncoding = [
  {
    name: "outgoingAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type WrapArgs = {
  outgoingAmount: bigint;
  minIncomingAmount: bigint;
};

export function wrapEncode(args: WrapArgs): Hex {
  return encodeAbiParameters(wrapEncoding, [args.outgoingAmount, args.minIncomingAmount]);
}

export function wrapDecode(encoded: Hex): WrapArgs {
  const [outgoingAmount, minIncomingAmount] = decodeAbiParameters(wrapEncoding, encoded);

  return {
    outgoingAmount,
    minIncomingAmount,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL POSITION
//--------------------------------------------------------------------------------------------

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  RequestWithdrawals: 0n,
  ClaimWithdrawals: 1n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// EXTERNAL POSITION - REQUEST WITHDRAWALS
//--------------------------------------------------------------------------------------------

export const requestWithdrawals = ExternalPositionManager.makeUse(Action.RequestWithdrawals, requestWithdrawalsEncode);
export const createAndRequestWithdrawals = ExternalPositionManager.makeCreateAndUse(
  Action.RequestWithdrawals,
  requestWithdrawalsEncode,
);

const requestWithdrawalsEncoding = [
  {
    name: "amount",
    type: "uint256",
  },
] as const;

export type RequestWithdrawalsArgs = {
  amount: bigint;
};

export function requestWithdrawalsEncode(args: RequestWithdrawalsArgs): Hex {
  return encodeAbiParameters(requestWithdrawalsEncoding, [args.amount]);
}

export function requestWithdrawalsDecode(encoded: Hex): RequestWithdrawalsArgs {
  const [amount] = decodeAbiParameters(requestWithdrawalsEncoding, encoded);

  return { amount };
}

//--------------------------------------------------------------------------------------------
// CLAIM WITHDRAWALS
//--------------------------------------------------------------------------------------------

export const claimWithdrawals = ExternalPositionManager.makeUse(Action.ClaimWithdrawals, claimWithdrawalsEncode);

const claimWithdrawalsEncoding = [
  {
    name: "requestId",
    type: "uint256",
  },
] as const;

export type ClaimWithdrawalsArgs = {
  requestId: bigint;
};

export function claimWithdrawalsEncode(args: ClaimWithdrawalsArgs): Hex {
  return encodeAbiParameters(claimWithdrawalsEncoding, [args.requestId]);
}

export function claimWithdrawalsDecode(encoded: Hex): ClaimWithdrawalsArgs {
  const [requestId] = decodeAbiParameters(claimWithdrawalsEncoding, encoded);

  return { requestId };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

const staderStakePoolsManagerAbi = [
  {
    inputs: [{ internalType: "uint256", name: "_assets", type: "uint256" }],
    name: "previewDeposit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function previewDeposit(
  client: Client,
  args: Viem.ContractCallParameters<{
    staderStakingPoolManager: Address;
    depositAmount: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: staderStakePoolsManagerAbi,
    functionName: "previewDeposit",
    address: args.staderStakingPoolManager,
    args: [args.depositAmount],
  });
}

const lidoWithdrawalsQueueAbi = [
  {
    inputs: [],
    name: "getLastCheckpointIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },

  {
    inputs: [
      { internalType: "uint256[]", name: "_requestIds", type: "uint256[]" },
      { internalType: "uint256", name: "_firstIndex", type: "uint256" },
      { internalType: "uint256", name: "_lastIndex", type: "uint256" },
    ],
    name: "findCheckpointHints",
    outputs: [{ internalType: "uint256[]", name: "hintIds", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256[]", name: "_requestIds", type: "uint256[]" }],
    name: "getWithdrawalStatus",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "amountOfStETH", type: "uint256" },
          { internalType: "uint256", name: "amountOfShares", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "bool", name: "isFinalized", type: "bool" },
          { internalType: "bool", name: "isClaimed", type: "bool" },
        ],
        internalType: "struct WithdrawalQueueBase.WithdrawalRequestStatus[]",
        name: "statuses",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getLastCheckpointIndex(
  client: Client,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: lidoWithdrawalsQueueAbi,
    functionName: "getLastCheckpointIndex",
    address: args.lidoWithdrawalsQueue,
  });
}

export function findCheckpointHints(
  client: Client,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
    requestIds: ReadonlyArray<bigint>;
    firstIndex: bigint;
    lastIndex: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: lidoWithdrawalsQueueAbi,
    functionName: "findCheckpointHints",
    address: args.lidoWithdrawalsQueue,
    args: [args.requestIds, args.firstIndex, args.lastIndex],
  });
}

export function getWithdrawalStatus(
  client: Client,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
    requestIds: ReadonlyArray<bigint>;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: lidoWithdrawalsQueueAbi,
    functionName: "getWithdrawalStatus",
    address: args.lidoWithdrawalsQueue,
    args: [args.requestIds],
  });
}
