import { IProtocolFeeTracker } from "../../../abis/src/abis/IProtocolFeeTracker.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export function getAccruedProtocolFee(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
    protocolFeeTracker: Address;
  }>,
) {
  return simulateContract(client, {
    ...readContractParameters(args),
    abi: IProtocolFeeTracker,
    functionName: "payFee",
    address: args.protocolFeeTracker,
    account: args.vaultProxy,
  });
}
