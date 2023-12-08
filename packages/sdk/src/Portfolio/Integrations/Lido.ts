import { Address, Chain, type Hex, PublicClient, Transport, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  RequestWithdrawals: 0n,
  ClaimWithdrawals: 1n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// REQUEST WITHDRAWALS
//--------------------------------------------------------------------------------------------

export const requestWithdrawals = ExternalPositionManager.makeUse(Action.RequestWithdrawals, requestWithdrawalsEncode);
export const createAndRequestWithdrawals = ExternalPositionManager.makeCreateAndUse(
  Action.RequestWithdrawals,
  requestWithdrawalsEncode,
);

const requestWithdrawalsEncoding = [
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type RequestWithdrawalsArgs = {
  amounts: ReadonlyArray<bigint>;
};

export function requestWithdrawalsEncode(args: RequestWithdrawalsArgs): Hex {
  return encodeAbiParameters(requestWithdrawalsEncoding, [args.amounts]);
}

export function requestWithdrawalsDecode(encoded: Hex): RequestWithdrawalsArgs {
  const [amounts] = decodeAbiParameters(requestWithdrawalsEncoding, encoded);

  return { amounts };
}

//--------------------------------------------------------------------------------------------
// CLAIM WITHDRAWALS
//--------------------------------------------------------------------------------------------

export const claimWithdrawals = ExternalPositionManager.makeUse(Action.ClaimWithdrawals, claimWithdrawalsEncode);

const claimWithdrawalsEncoding = [
  {
    name: "requestIds",
    type: "uint256[]",
  },
  {
    name: "hints",
    type: "uint256[]",
  },
] as const;

export type ClaimWithdrawalsArgs = {
  requestIds: ReadonlyArray<bigint>;
  hints: ReadonlyArray<bigint>;
};

export function claimWithdrawalsEncode(args: ClaimWithdrawalsArgs): Hex {
  return encodeAbiParameters(claimWithdrawalsEncoding, [args.requestIds, args.hints]);
}

export function claimWithdrawalsDecode(encoded: Hex): ClaimWithdrawalsArgs {
  const [requestIds, hints] = decodeAbiParameters(claimWithdrawalsEncoding, encoded);

  return { requestIds, hints };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

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

export function getLastCheckpointIndex<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: lidoWithdrawalsQueueAbi,
    functionName: "getLastCheckpointIndex",
    address: args.lidoWithdrawalsQueue,
  });
}

export function findCheckpointHints<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
    requestIds: ReadonlyArray<bigint>;
    firstIndex: bigint;
    lastIndex: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: lidoWithdrawalsQueueAbi,
    functionName: "findCheckpointHints",
    address: args.lidoWithdrawalsQueue,
    args: [args.requestIds, args.firstIndex, args.lastIndex],
  });
}

export async function getWithdrawalStatus<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    lidoWithdrawalsQueue: Address;
    requestIds: ReadonlyArray<bigint>;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: lidoWithdrawalsQueueAbi,
    functionName: "getWithdrawalStatus",
    address: args.lidoWithdrawalsQueue,
    args: [args.requestIds],
  });
}
