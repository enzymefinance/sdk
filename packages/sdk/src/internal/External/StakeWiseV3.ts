import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";

export async function getSharesBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    account: Address;
    stakeWiseVaultAddress: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function balanceOf(address _account) view returns (uint256 balance_)"]),
    functionName: "balanceOf",
    address: args.stakeWiseVaultAddress,
    args: [args.account]
  });
}

export async function getStakedEthBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    account: Address;
    stakeWiseVaultAddress: Address;
  }>,
) {
  const sharesBalance = await getSharesBalance(client, args);

  return Viem.readContract(client, args, {
    abi: parseAbi(["function convertToAssets(uint256 _shares) view returns (uint256 assets_)"]),
    functionName: "convertToAssets",
    address: args.stakeWiseVaultAddress,
    args: [sharesBalance]
  });
}


