import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { Viem } from "../../Utils.js";

export * as AaveV2Debt from "./ExternalPositions/AaveV2Debt.js";
export * as AaveV3Debt from "./ExternalPositions/AaveV3Debt.js";
export * as ArbitraryLoan from "./ExternalPositions/ArbitraryLoan.js";
export * as CompoundV2Debt from "./ExternalPositions/CompoundV2Debt.js";
export * as ConvexVoting from "./ExternalPositions/ConvexVoting.js";
export * as Kiln from "./ExternalPositions/Kiln.js";
export * as LidoWithdrawals from "./ExternalPositions/LidoWithdrawals.js";
export * as Liquity from "./ExternalPositions/Liquity.js";
export * as MapleLiquidity from "./ExternalPositions/MapleLiquidity.js";
export * as StakeWise from "./ExternalPositions/StakeWise.js";
export * as TheGraphDelegation from "./ExternalPositions/TheGraphDelegation.js";
export * as UniswapV3Liquidity from "./ExternalPositions/UniswapV3Liquidity.js";

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
