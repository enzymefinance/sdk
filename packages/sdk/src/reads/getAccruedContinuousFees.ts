import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis";
import { IPerformanceFee } from "@enzymefinance/abis";
import { IUnpermissionedActionsWrapper } from "@enzymefinance/abis/IUnpermissionedActionsWrapper";
import { type Address, type PublicClient, parseAbi } from "viem";

export async function getAccruedContinuousFees(
  client: PublicClient,
  args: ReadContractParameters<{
    unpermissionedActionsWrapper: Address;
    accessor: Address;
    vaultProxy: Address;
    contracts: {
      feeManager: Address;
      unpermissionedActionsWrapper: Address;
      managementFee: Address;
      performanceFee: Address;
    };
  }>,
) {
  const continuousFees = (await client.readContract({
    ...readContractParameters(args),
    abi: IUnpermissionedActionsWrapper,
    functionName: "getContinuousFeesForFund",
    address: args.unpermissionedActionsWrapper,
    args: [args.accessor],
  })) as unknown as Address[];

  const hasManagementFee = continuousFees.some((fee) => fee === args.contracts.managementFee);
  const hasPerformanceFee = continuousFees.some((fee) => fee === args.contracts.performanceFee);

  const managementAbi = parseAbi([
    "function settle(address,address,uint8,bytes,uint256) view returns (bigitn, string, bigint)",
  ] as const);
  let managementFeeSharesDue = 0n;

  if (hasManagementFee) {
    const managementFeeSettledReturn = (await client.readContract({
      ...readContractParameters(args),
      abi: managementAbi,
      functionName: "settle",
      address: args.accessor,
      args: [args.accessor, args.vaultProxy, 0, "0x", 0n],
    })) as unknown as {
      settlementType_: bigint;
      "1": string;
      sharesDue_: bigint;
    };

    managementFeeSharesDue = managementFeeSettledReturn.sharesDue_;
  }

  let performanceFeeSharesDue = 0n;
  let highWaterMark = 0n;

  if (hasPerformanceFee) {
    const gav = (await client.readContract({
      ...readContractParameters(args),
      abi: IComptrollerLib,
      functionName: "calcGav",
      address: args.accessor,
    })) as unknown as bigint;

    const performanceFeeSettledReturn = (await client.readContract({
      ...readContractParameters(args),
      abi: IPerformanceFee,
      functionName: "settle",
      address: args.contracts.managementFee,
      args: [args.accessor, args.vaultProxy, 0, "0x", gav],
    })) as unknown as [number, Address, bigint];

    performanceFeeSharesDue = performanceFeeSettledReturn[2];

    const performanceFeeHighWaterMarkReturn = (await client.readContract({
      ...readContractParameters(args),
      abi: IPerformanceFee,
      functionName: "getFeeInfoForFund",
      address: args.contracts.performanceFee,
      args: [args.accessor],
    })) as unknown as [bigint, bigint];

    highWaterMark = performanceFeeHighWaterMarkReturn[1];
  }

  return {
    continuousFees,
    highWaterMark,
    managementFeeSharesDue,
    performanceFeeSharesDue,
  };
}
