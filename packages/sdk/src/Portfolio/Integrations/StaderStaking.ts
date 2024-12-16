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
// EXTERNAL POSITION - CLAIM WITHDRAWALS
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

const staderStakingPoolManagerAbi = [
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
    abi: staderStakingPoolManagerAbi,
    functionName: "previewDeposit",
    address: args.staderStakingPoolManager,
    args: [args.depositAmount],
  });
}

const userWithdrawManagerAbi = [
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "getRequestIdsByUser",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "userWithdrawRequests",
    outputs: [
      { internalType: "address payable", name: "owner", type: "address" },
      { internalType: "uint256", name: "ethXAmount", type: "uint256" },
      { internalType: "uint256", name: "ethExpected", type: "uint256" },
      { internalType: "uint256", name: "ethFinalized", type: "uint256" },
      { internalType: "uint256", name: "requestBlock", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextRequestIdToFinalize",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getRequestIdsByUser(
  client: Client,
  args: Viem.ContractCallParameters<{
    userWithdrawManager: Address;
    user: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: userWithdrawManagerAbi,
    functionName: "getRequestIdsByUser",
    address: args.userWithdrawManager,
    args: [args.user],
  });
}

export async function getUserWithdrawRequests(
  client: Client,
  args: Viem.ContractCallParameters<{
    userWithdrawManager: Address;
    requestId: bigint;
  }>,
) {
  const [owner, ethxAmount, ethExpected, ethFinalized, requestBlock] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: userWithdrawManagerAbi,
    functionName: "userWithdrawRequests",
    address: args.userWithdrawManager,
    args: [args.requestId],
  });

  return { owner, ethxAmount, ethExpected, ethFinalized, requestBlock };
}

export function getNextRequestIdToFinalize(
  client: Client,
  args: Viem.ContractCallParameters<{
    userWithdrawManager: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: userWithdrawManagerAbi,
    functionName: "nextRequestIdToFinalize",
    address: args.userWithdrawManager,
  });
}

export async function getRequestsWithDetailsByUser(
  client: Client,
  args: Viem.ContractCallParameters<{
    userWithdrawManager: Address;
    user: Address;
  }>,
) {
  const [requestIds, nextRequestIdToFinalize] = await Promise.all([
    getRequestIdsByUser(client, {
      userWithdrawManager: args.userWithdrawManager,
      user: args.user,
    }),
    getNextRequestIdToFinalize(client, { userWithdrawManager: args.userWithdrawManager }),
  ]);

  const requestDetails = await Promise.all(
    requestIds.map((requestId) =>
      getUserWithdrawRequests(client, { userWithdrawManager: args.userWithdrawManager, requestId }),
    ),
  );

  return requestIds.map((requestId, index) => {
    return {
      requestId,
      ...requestDetails[index],
      claimable: requestId < nextRequestIdToFinalize,
    };
  });
}
