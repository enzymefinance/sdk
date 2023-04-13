import { type Address, parseAbiItem } from "viem";
import { sendTestTransaction } from "../client.js";
import { ALICE, DEPLOYER, WETH } from "./constants.js";
import { prepareSetupVaultParams, type PrepareSetupVaultParamsArgs } from "../../src/actions/setupVault.js";
import { toSeconds } from "../../src/utils/conversion.js";

export async function depositWeth({
  account,
  amount,
}: {
  account: Address;
  amount: bigint;
}) {
  const abi = parseAbiItem("function deposit() payable");

  await sendTestTransaction({
    address: WETH,
    abi: [abi],
    functionName: "deposit",
    value: amount,
    account,
  });
}

export async function approveSpend({
  token,
  account,
  spender,
  amount,
}: {
  token: Address;
  account: Address;
  spender: Address;
  amount: bigint;
}) {
  const abi = parseAbiItem("function approve(address spender, uint256 amount) returns (bool)");

  await sendTestTransaction({
    address: token,
    abi: [abi],
    functionName: "approve",
    account: account,
    args: [spender, amount],
  });
}

export async function createTestVault(settings?: Partial<PrepareSetupVaultParamsArgs>) {
  const {
    result: [comptrollerProxy, vaultProxy],
  } = await sendTestTransaction({
    ...prepareSetupVaultParams({
      vaultOwner: ALICE,
      vaultName: "Test Vault",
      vaultSymbol: "TEST",
      denominationAsset: WETH,
      sharesActionTimelock: toSeconds({ days: 1 }),
      ...settings,
    }),
    account: settings?.vaultOwner ?? ALICE,
    address: DEPLOYER,
  });

  return { vaultProxy, comptrollerProxy };
}
