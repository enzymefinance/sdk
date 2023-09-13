import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis";
import { IPerformanceFee } from "@enzymefinance/abis";
import { IUnpermissionedActionsWrapper } from "@enzymefinance/abis/IUnpermissionedActionsWrapper";
import type { Address, PublicClient } from "viem";

const managementAbi = {
  name: "settle",
  type: "function",
  inputs: [
    {
      internalType: "address",
      name: "accessor",
      type: "address",
    },
    {
      internalType: "address",
      name: "vaultProxy",
      type: "address",
    },
    {
      internalType: "uint8",
      name: "feeType",
      type: "uint8",
    },
    {
      internalType: "bytes",
      name: "feeData",
      type: "bytes",
    },
    {
      internalType: "uint256",
      name: "gav",
      type: "uint256",
    },
  ],
  outputs: [
    {
      internalType: "uint256",
      name: "sharesDue_",
      type: "uint256",
    },
    {
      internalType: "string",
      name: "reason",
      type: "string",
    },
    {
      internalType: "uint256",
      name: "sharesTransferred_",
      type: "uint256",
    },
  ],
  stateMutability: "view",
} as const;

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
  const continuousFees = await client.readContract({
    ...readContractParameters(args),
    abi: IUnpermissionedActionsWrapper,
    functionName: "getContinuousFeesForFund",
    address: args.unpermissionedActionsWrapper,
    args: [args.accessor],
  });

  const hasManagementFee = continuousFees.some((fee) => fee === args.contracts.managementFee);
  const hasPerformanceFee = continuousFees.some((fee) => fee === args.contracts.performanceFee);

  let managementFeeSharesDue = 0n;

  if (hasManagementFee) {
    const [sharesDue, _, __] = await client.readContract({
      ...readContractParameters(args),
      abi: [managementAbi],
      functionName: "settle",
      address: args.accessor,
      args: [args.accessor, args.vaultProxy, 0, "0x", 0n],
    });

    managementFeeSharesDue = sharesDue;
  }

  let performanceFeeSharesDue = 0n;
  let highWaterMark = 0n;

  if (hasPerformanceFee) {
    const { result: gav } = await client.simulateContract({
      ...readContractParameters(args),
      abi: IComptrollerLib,
      functionName: "calcGav",
      address: args.accessor,
    });

    const [
      {
        result: [_, __, performanceSharesDue],
      },
      feeInfoForFund,
    ] = await Promise.all([
      client.simulateContract({
        ...readContractParameters(args),
        abi: IPerformanceFee,
        functionName: "settle",
        address: args.contracts.managementFee,
        args: [args.accessor, args.vaultProxy, 0, "0x", gav],
      }),
      client.readContract({
        ...readContractParameters(args),
        abi: IPerformanceFee,
        functionName: "getFeeInfoForFund",
        address: args.contracts.performanceFee,
        args: [args.accessor],
      }),
    ]);

    performanceFeeSharesDue = performanceSharesDue;
    highWaterMark = feeInfoForFund.highWaterMark;
  }

  return {
    continuousFees,
    highWaterMark,
    managementFeeSharesDue,
    performanceFeeSharesDue,
  };
}
