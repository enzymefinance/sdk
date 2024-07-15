import { type Address, type Client, parseAbi } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function ethToSwETHRate(
  client: Client,
  args: Viem.ContractCallParameters<{
    swethAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function ethToSwETHRate() view returns (uint256 rate_)"]),
    functionName: "ethToSwETHRate",
    address: args.swethAddress,
  });
}
