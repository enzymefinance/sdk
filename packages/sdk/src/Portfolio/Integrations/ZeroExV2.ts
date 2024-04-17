import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";

export function getZeroExV2Exchange(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    zeroExV2Adapter: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getZeroExV2Exchange() public view returns (address zeroExV2Exchange)"]),
    functionName: "getZeroExV2Exchange",
    address: args.zeroExV2Adapter,
  });
}

export function isAllowedMaker(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    zeroExV2Adapter: Address;
    who: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function isAllowedMaker(address who) public view returns (bool isAllowedMaker)"]),
    functionName: "isAllowedMaker",
    address: args.zeroExV2Adapter,
    args: [args.who],
  });
}
