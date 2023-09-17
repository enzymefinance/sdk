import { IManagementFee } from "../../../abis/src/abis/IManagementFee.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { getComptrollerProxy } from "./getComptrollerProxy.js";
import { IComptrollerLib, IPerformanceFee } from "@enzymefinance/abis";
import { IUnpermissionedActionsWrapper } from "@enzymefinance/abis/IUnpermissionedActionsWrapper";
import type { Address, PublicClient } from "viem";
import { isAddressEqual } from "viem";

export async function getAccruedContinuousFees(
  client: PublicClient,
  args: ReadContractParameters<{
    unpermissionedActionsWrapper: Address;
    comptrollerProxy?: Address;
    vaultProxy: Address;
    feeManager: Address;
    managementFee: Address;
    performanceFee: Address;
  }>,
) {
  const comptrollerProxy = args.comptrollerProxy ?? (await getComptrollerProxy(client, args));

  const continuousFees = await client.readContract({
    ...readContractParameters(args),
    abi: IUnpermissionedActionsWrapper,
    functionName: "getContinuousFeesForFund",
    address: args.unpermissionedActionsWrapper,
    args: [comptrollerProxy],
  });

  const hasManagementFee = continuousFees.some((fee) => isAddressEqual(fee, args.managementFee));
  const hasPerformanceFee = continuousFees.some((fee) => isAddressEqual(fee, args.performanceFee));

  let managementFeeSharesDue = 0n;

  if (hasManagementFee) {
    const {
      result: [_, __, sharesDue],
    } = await client.simulateContract({
      ...readContractParameters(args),
      abi: IManagementFee,
      functionName: "settle",
      address: args.managementFee,
      args: [comptrollerProxy, args.vaultProxy, 0, "0x", 0n],
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
      address: comptrollerProxy,
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
        address: args.performanceFee,
        args: [comptrollerProxy, args.vaultProxy, 0, "0x", gav],
      }),
      client.readContract({
        ...readContractParameters(args),
        abi: IPerformanceFee,
        functionName: "getFeeInfoForFund",
        address: args.performanceFee,
        args: [comptrollerProxy],
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
