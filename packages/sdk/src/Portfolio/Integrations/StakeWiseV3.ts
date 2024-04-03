import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
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
    name: "stakeWiseVault",
  },
  {
    name: "assetAmount",
    type: "uint256",
  },
] as const;

export type StakeArgs = {
  stakeWiseVault: Address;
  assetAmount: bigint;
};

export function stakeEncode(args: StakeArgs): Hex {
  return encodeAbiParameters(stakeEncoding, [args.stakeWiseVault, args.assetAmount]);
}

export function stakeDecode(encoded: Hex): StakeArgs {
  const [stakeWiseVault, assetAmount] = decodeAbiParameters(stakeEncoding, encoded);

  return {
    stakeWiseVault,
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
    name: "stakeWiseVault",
  },
  {
    name: "shareAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  stakeWiseVault: Address;
  sharesAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.stakeWiseVault, args.sharesAmount]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [stakeWiseVault, sharesAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return {
    stakeWiseVault,
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
    name: "stakeWiseVault",
  },
  {
    name: "sharesAmount",
    type: "uint256",
  },
] as const;

export type EnterExitQueueArgs = {
  sharesAmount: bigint;
  stakeWiseVault: Address;
};

export function enterExitQueueEncode(args: EnterExitQueueArgs): Hex {
  return encodeAbiParameters(enterExitQueueEncoding, [args.stakeWiseVault, args.sharesAmount]);
}

export function enterExitQueueDecode(encoded: Hex): EnterExitQueueArgs {
  const [stakeWiseVault, sharesAmount] = decodeAbiParameters(enterExitQueueEncoding, encoded);

  return {
    stakeWiseVault,
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
    name: "stakeWiseVault",
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
  stakeWiseVault: Address;
  timestamp: bigint;
};

export function claimExitedAssetsEncode(args: ClaimExitedAssetsArgs): Hex {
  return encodeAbiParameters(claimExitedAssetsEncoding, [args.stakeWiseVault, args.positionTicket, args.timestamp]);
}

export function claimExitedAssetsDecode(encoded: Hex): ClaimExitedAssetsArgs {
  const [stakeWiseVault, positionTicket, timestamp] = decodeAbiParameters(claimExitedAssetsEncoding, encoded);

  return {
    stakeWiseVault,
    positionTicket,
    timestamp,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function convertSharesToAssets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    sharesAmount: bigint;
    stakeWiseVault: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function convertToAssets(uint256 _shares) view returns (uint256 assets_)"]),
    functionName: "convertToAssets",
    address: args.stakeWiseVault,
    args: [args.sharesAmount],
  });
}

export function getVaultSharesBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    account: Address;
    stakeWiseVault: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getShares(address _account) view returns (uint256 shares_)"]),
    functionName: "getShares",
    address: args.stakeWiseVault,
    args: [args.account],
  });
}

export async function getStakedEthBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    account: Address;
    stakeWiseVault: Address;
  }>,
) {
  const sharesBalance = await getVaultSharesBalance(client, args);
  return convertSharesToAssets(client, { sharesAmount: sharesBalance, stakeWiseVault: args.stakeWiseVault });
}

export function getStakePreview(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    account: Address;
    stakeWiseVault: Address;
    assetAmount: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function convertToShares(uint256 _assets) view returns (uint256 shares_)"]),
    functionName: "convertToShares",
    address: args.stakeWiseVault,
    args: [args.assetAmount],
  });
}

export function getClaimExitedAssetsPreview(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    exitQueueIndex: bigint;
    positionTicket: bigint;
    stakeWiseVault: Address;
    receiver: Address;
    timestamp: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi([
      "function calculateExitedAssets(address _receiver, uint256 _positionTicket, uint256 _timestamp, uint256 _exitQueueIndex) view returns (uint256 leftShares_, uint256 claimedShares_, uint256 claimedAssets_)",
    ]),
    functionName: "calculateExitedAssets",
    address: args.stakeWiseVault,
    args: [args.receiver, args.positionTicket, args.timestamp, args.exitQueueIndex],
  });
}

export function getExitQueueIndex(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    positionTicket: bigint;
    stakeWiseVault: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getExitQueueIndex(uint256 _positionTicket) view returns (int256 exitQueueIndex_)"]),
    functionName: "getExitQueueIndex",
    address: args.stakeWiseVault,
    args: [args.positionTicket],
  });
}

export function isCollateralized(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    keeperRewards: Address;
    stakeWiseVault: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function isCollateralized(address _vault) view returns (bool isCollateralized_)"]),
    functionName: "isCollateralized",
    address: args.keeperRewards,
    args: [args.stakeWiseVault],
  });
}

export function isHarvestRequired(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    keeperRewards: Address;
    stakeWiseVault: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function isHarvestRequired(address _vault) view returns (bool harvestRequired_)"]),
    functionName: "isHarvestRequired",
    address: args.keeperRewards,
    args: [args.stakeWiseVault],
  });
}
