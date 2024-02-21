import { type Address,  PublicClient, parseAbi } from "viem";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function ethToSwETHRate(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    swethAddress: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function ethToSwETHRate() view returns (uint256 rate_)"]),
    functionName: "ethToSwETHRate",
    address: args.swethAddress,
  });
}
