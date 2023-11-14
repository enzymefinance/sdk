import { Address, PublicClient, parseAbi } from "viem";
import { Viem } from "../../../Utils.js";

export async function getZeroExV2Exchange(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    zeroExV2Adapter: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function getZeroExV2Exchange() public view returns (address zeroExV2Exchange)"]),
    functionName: "getZeroExV2Exchange",
    address: args.zeroExV2Adapter,
  });
}

export async function isAllowedMaker(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    zeroExV2Adapter: Address;
    who: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function isAllowedMaker(address who) public view returns (bool isAllowedMaker)"]),
    functionName: "isAllowedMaker",
    address: args.zeroExV2Adapter,
    args: [args.who],
  });
}
