import { type Address, parseAbiItem } from "viem";
import { sendTestTransaction, publicClient, testClient } from "../client.js";
import { ALICE, DEPLOYER, WETH } from "./constants.js";
import { prepareSetupVaultParams, type PrepareSetupVaultParamsArgs } from "../../src/actions/setupVault.js";
import { toBps, toSeconds } from "../../src/utils/conversion.js";
import { simulateBuyShares } from "../../src/actions/buyShares.js";

export async function wrapEther({
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

export interface DepositIntoVaultArgs {
  comptrollerProxy: Address;
  investmentAmount: bigint;
  depositorAddress: Address;
  maxSlippageBps?: bigint;
}

export async function depositIntoVault({
  comptrollerProxy,
  investmentAmount,
  depositorAddress,
  maxSlippageBps = toBps(0.1),
}: DepositIntoVaultArgs) {
  const { expectedSharesQuantity, transactionRequest } = await simulateBuyShares({
    depositorAddress,
    investmentAmount,
    comptrollerProxy,
    maxSlippageBps,
    publicClient,
  });

  return {
    expectedSharesQuantity,
    transactionRequest,
  };
}

export async function increaseTimeAndMine({ days, blocks }: { days: number; blocks: number }) {
  return await Promise.all([
    testClient.increaseTime({ seconds: Number(toSeconds({ days })) }),
    testClient.mine({ blocks }),
  ]);
}
