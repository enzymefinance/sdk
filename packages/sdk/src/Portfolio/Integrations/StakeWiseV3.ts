import { type Address, type Hex, PublicClient, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  Stake: 0n,
  Redeem: 1n,
  EnterExitQueue: 2n,
  ClaimExitedAssets: 3n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// STAKE
//--------------------------------------------------------------------------------------------

export const stake = ExternalPositionManager.makeUse(Action.Stake, stakeEncode);
export const createAndStake = ExternalPositionManager.makeCreateAndUse(Action.Stake, stakeEncode);

const stakeEncoding = [
  {
    type: "address",
    name: "stakeWiseVaultAddress",
  },
  {
    name: "assetAmount",
    type: "uint256",
  },
] as const;

export type StakeArgs = {
  stakeWiseVaultAddress: Address;
  assetAmount: bigint;
};

export function stakeEncode(args: StakeArgs): Hex {
  return encodeAbiParameters(stakeEncoding, [args.stakeWiseVaultAddress, args.assetAmount]);
}

export function stakeDecode(encoded: Hex): StakeArgs {
  const [stakeWiseVaultAddress, assetAmount] = decodeAbiParameters(stakeEncoding, encoded);

  return {
    stakeWiseVaultAddress,
    assetAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = ExternalPositionManager.makeUse(Action.Redeem, redeemEncode);

const redeemEncoding = [
  {
    type: "address",
    name: "stakeWiseVaultAddress",
  },
  {
    name: "shareAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  stakeWiseVaultAddress: Address;
  sharesAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.stakeWiseVaultAddress, args.sharesAmount]);
}

export function claimFeesDecode(encoded: Hex): RedeemArgs {
  const [stakeWiseVaultAddress, sharesAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return {
    stakeWiseVaultAddress,
    sharesAmount,
  };
}

//--------------------------------------------------------------------------------------------
// ENTER EXIT QUEUE
//--------------------------------------------------------------------------------------------

export const enterExitQueue = ExternalPositionManager.makeUse(Action.EnterExitQueue, enterExitQueueEncode);

const enterExitQueueEncoding = [
  {
    type: "address",
    name: "stakeWiseVaultAddress",
  },
  {
    name: "sharesAmount",
    type: "uint256",
  },
] as const;

export type EnterExitQueueArgs = {
  sharesAmount: bigint;
  stakeWiseVaultAddress: Address;
};

export function enterExitQueueEncode(args: EnterExitQueueArgs): Hex {
  return encodeAbiParameters(enterExitQueueEncoding, [args.stakeWiseVaultAddress, args.sharesAmount]);
}

export function enterExitQueueDecode(encoded: Hex): EnterExitQueueArgs {
  const [stakeWiseVaultAddress, sharesAmount] = decodeAbiParameters(enterExitQueueEncoding, encoded);

  return {
    stakeWiseVaultAddress,
    sharesAmount,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM EXITED ASSET
//--------------------------------------------------------------------------------------------

export const claimExitedAssets = ExternalPositionManager.makeUse(Action.ClaimExitedAssets, claimExitedAssetsEncode);

const claimExitedAssetsEncoding = [
  {
    type: "address",
    name: "stakeWiseVaultAddress",
  },
  {
    name: "positionTicket",
    type: "uint256",
  },
  {
    name: "timestamp",
    type: "uint256",
  },
] as const;

export type ClaimExitedAssetsArgs = {
  positionTicket: bigint;
  stakeWiseVaultAddress: Address;
  timestamp: bigint;
};

export function claimExitedAssetsEncode(args: ClaimExitedAssetsArgs): Hex {
  return encodeAbiParameters(claimExitedAssetsEncoding, [
    args.stakeWiseVaultAddress,
    args.positionTicket,
    args.timestamp,
  ]);
}

export function claimExitedAssetsDecode(encoded: Hex): ClaimExitedAssetsArgs {
  const [stakeWiseVaultAddress, positionTicket, timestamp] = decodeAbiParameters(claimExitedAssetsEncoding, encoded);

  return {
    stakeWiseVaultAddress,
    positionTicket,
    timestamp,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function getVaultSharesBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    account: Address;
    stakeWiseVaultAddress: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function getShares(address _account) view returns (uint256 shares_)"]),
    functionName: "getShares",
    address: args.stakeWiseVaultAddress,
    args: [args.account],
  });
}

export async function getStakedEthBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    account: Address;
    stakeWiseVaultAddress: Address;
  }>,
) {
  const sharesBalance = await getVaultSharesBalance(client, args);

  return Viem.readContract(client, args, {
    abi: parseAbi(["function convertToAssets(uint256 _shares) view returns (uint256 assets_)"]),
    functionName: "convertToAssets",
    address: args.stakeWiseVaultAddress,
    args: [sharesBalance],
  });
}

export async function getStakePreview(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    account: Address;
    stakeWiseVaultAddress: Address;
    assetAmount: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function convertToShares(uint256 _assets) view returns (uint256 shares_)"]),
    functionName: "convertToShares",
    address: args.stakeWiseVaultAddress,
    args: [args.assetAmount],
  });
}

export async function getClaimExitedAssetsPreview(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    exitQueueIndex: bigint;
    positionTicket: bigint;
    stakeWiseVaultAddress: Address;
    receiver: Address;
    timestamp: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi([
      "function calculateExitedAssets(address _receiver, uint256 _positionTicket, uint256 _timestamp, uint256 _exitQueueIndex) view returns (uint256 leftShares_, uint256 claimedShares_, uint256 claimedAssets_)",
    ]),
    functionName: "calculateExitedAssets",
    address: args.stakeWiseVaultAddress,
    args: [args.receiver, args.positionTicket, args.timestamp, args.exitQueueIndex],
  });
}
