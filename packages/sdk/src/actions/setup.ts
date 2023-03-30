import { IFundDeployer } from "@enzymefinance/abis/IFundDeployer";
import { Address, Bytes } from "../types.js";
import { prepareFunctionParams } from "../utils/viem.js";
import { toSeconds } from "../utils/conversion.js";

export interface SetupVaultParams {
  vaultOwner: Address;
  vaultName: string;
  vaultSymbol: string;
  denominationAsset: Address;
  sharesActionTimelock?: bigint;
  feeSettings?: Bytes;
  policySettings?: Bytes;
}

export function setupVaultParams({
  vaultOwner,
  vaultName,
  vaultSymbol,
  denominationAsset,
  sharesActionTimelock = toSeconds({ days: 1 }),
  feeSettings = "0x",
  policySettings = "0x",
}: SetupVaultParams) {
  return prepareFunctionParams({
    abi: IFundDeployer,
    functionName: "createNewFund",
    args: [vaultOwner, vaultName, vaultSymbol, denominationAsset, sharesActionTimelock, feeSettings, policySettings],
  });
}
