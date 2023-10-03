import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import type { Address, PublicClient } from "viem";

export * as AaveV2Debt from "@enzymefinance/sdk/internal/Extensions/ExternalPositions/AaveV2Debt";
export * as ArbitraryLoan from "@enzymefinance/sdk/internal/Extensions/ExternalPositions/ArbitraryLoan";
export * as CompoundV2Debt from "@enzymefinance/sdk/internal/Extensions/ExternalPositions/CompoundV2Debt";
export * as ConvexVoting from "@enzymefinance/sdk/internal/Extensions/ExternalPositions/ConvexVoting";
export * as Kiln from "@enzymefinance/sdk/internal/Extensions/ExternalPositions/Kiln";
export * as Liquity from "@enzymefinance/sdk/internal/Extensions/ExternalPositions/Liquity";
export * as MapleLiquidity from "@enzymefinance/sdk/internal/Extensions/ExternalPositions/MapleLiquidity";
export * as StakeWise from "@enzymefinance/sdk/internal/Extensions/ExternalPositions/StakeWise";
export * as TheGraphDelegation from "@enzymefinance/sdk/internal/Extensions/ExternalPositions/TheGraphDelegation";
export * as UniswapV3Liquidity from "@enzymefinance/sdk/internal/Extensions/ExternalPositions/UniswapV3Liquidity";

export function getLabelForType(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    externalPositionFactory: Address;
    typeId: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IExternalPositionFactory,
    functionName: "getLabelForPositionType",
    address: args.externalPositionFactory,
    args: [args.typeId],
  });
}

export function isActive(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    externalPosition: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IVaultLib,
    address: args.vaultProxy,
    functionName: "isActiveExternalPosition",
    args: [args.externalPosition],
  });
}
