import { getBalanceOf } from "@enzymefinance/sdk/Assets";
import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";

export async function getStakedEthBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    account: Address;
    stakeWiseVaultAddress: Address;
  }>,
) {
  const sharesBalance = await getBalanceOf(client, { asset: args.stakeWiseVaultAddress, owner: args.account });

  return Viem.readContract(client, args, {
    abi: parseAbi(["function convertToAssets(uint256 _shares) view returns (uint256 assets_)"]),
    functionName: "convertToAssets",
    address: args.stakeWiseVaultAddress,
    args: [sharesBalance],
  });
}
