import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";

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
    abi: parseAbi(["function calculateExitedAssets(address _receiver, uint256 _positionTicket, uint256 _timestamp, uint256 _exitQueueIndex) view returns (uint256 leftShares_, uint256 claimedShares_, uint256 claimedAssets_)"]),
    functionName: "calculateExitedAssets",
    address: args.stakeWiseVaultAddress,
    args: [args.receiver, args.positionTicket, args.timestamp, args.exitQueueIndex],
  });

}