import * as Abis from "@enzymefinance/abis";
import type { Address, Client, Hex } from "viem";
import { readContract, simulateContract } from "viem/actions";
import { isEnabled } from "./Configuration/Policy.js";
import { Viem } from "./Utils.js";
import { Assertion } from "./Utils.js";

//--------------------------------------------------------------------------------------------
// DEPOSIT
//--------------------------------------------------------------------------------------------

export function getSharesActionTimelock(
  client: Client,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IComptrollerLib,
    address: args.comptrollerProxy,
    functionName: "getSharesActionTimelock",
  });
}

export function getLastSharesBoughtTimestamp(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositor: Address;
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IComptrollerLib,
    functionName: "getLastSharesBoughtTimestampForAccount",
    address: args.comptrollerProxy,
    args: [args.depositor],
  });
}

export async function getExpectedSharesForDeposit(
  client: Client,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    amount: bigint;
    depositor: Address;
  }>,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IComptrollerLib,
    functionName: "buyShares",
    address: args.comptrollerProxy,
    account: args.depositor,
    args: [args.amount, 1n],
  });

  return result;
}

export function deposit(
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    amount: bigint;
    depositor: Address;
    minSharesQuantity: bigint;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "buyShares",
    address: args.comptrollerProxy,
    args: [args.amount, args.minSharesQuantity],
  });
}

//--------------------------------------------------------------------------------------------
// REDEMPTION
//--------------------------------------------------------------------------------------------

export type RedeemSharesForSpecificAssetsParams = {
  comptrollerProxy: Address;
  recipient: Address;
  sharesQuantity: bigint;
  payoutAssets: ReadonlyArray<Address>;
  payoutPercentages: ReadonlyArray<bigint>;
};

export async function getSpecificAssetsRedemptionExpectedAmounts(
  client: Client,
  args: Viem.ContractCallParameters<RedeemSharesForSpecificAssetsParams>,
) {
  const { result: payoutAmounts } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IComptrollerLib,
    functionName: "redeemSharesForSpecificAssets",
    address: args.comptrollerProxy,
    args: [args.recipient, args.sharesQuantity, args.payoutAssets, args.payoutPercentages],
    account: args.recipient,
  });

  const output: Record<Address, bigint> = {};

  for (let i = 0; i < args.payoutAssets.length; i++) {
    const payoutAsset = args.payoutAssets[i];
    const payoutAmount = payoutAmounts[i];
    Assertion.invariant(payoutAmount !== undefined, "Expected payout amount to be defined.");
    Assertion.invariant(payoutAsset !== undefined, "Expected payout asset to be defined.");

    output[payoutAsset] = payoutAmount;
  }

  return output;
}

export function redeemSharesForSpecificAssets(args: RedeemSharesForSpecificAssetsParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "redeemSharesForSpecificAssets",
    address: args.comptrollerProxy,
    args: [args.recipient, args.sharesQuantity, args.payoutAssets, args.payoutPercentages],
  });
}

export function redeemSharesInKind(
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    recipient: Address;
    sharesQuantity: bigint;
    additionalAssets: ReadonlyArray<Address>;
    assetsToSkip: ReadonlyArray<Address>;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "redeemSharesInKind",
    address: args.comptrollerProxy,
    args: [args.recipient, args.sharesQuantity, args.additionalAssets, args.assetsToSkip],
  });
}

//--------------------------------------------------------------------------------------------
// DEPOSIT WRAPPER
//--------------------------------------------------------------------------------------------

interface NativeDepositArgs {
  depositWrapper: Address;
  comptrollerProxy: Address;
  exchange: Address;
  exchangeApproveTarget: Address;
  exchangeData: Hex;
  minInvestmentAmount: bigint;
  amount: bigint;
}

export async function getExpectedSharesForNativeTokenDeposit(
  client: Client,
  args: Viem.ContractCallParameters<NativeDepositArgs & { depositor: Address }>,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IDepositWrapper,
    address: args.depositWrapper,
    functionName: "exchangeEthAndBuyShares",
    args: [
      args.comptrollerProxy,
      1n,
      args.exchange,
      args.exchangeApproveTarget,
      args.exchangeData,
      args.minInvestmentAmount,
    ],
    value: args.amount,
    account: args.depositor,
  });

  return result;
}

export function depositNativeToken(args: NativeDepositArgs & { minSharesQuantity: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IDepositWrapper,
    address: args.depositWrapper,
    functionName: "exchangeEthAndBuyShares",
    args: [
      args.comptrollerProxy,
      args.minSharesQuantity,
      args.exchange,
      args.exchangeApproveTarget,
      args.exchangeData,
      args.minInvestmentAmount,
    ],
    value: args.amount,
  });
}

interface ERC20DepositArgs {
  depositWrapper: Address;
  comptrollerProxy: Address;
  inputAsset: Address;
  maxInputAssetAmount: bigint;
  exchange: Address;
  exchangeApproveTarget: Address;
  exchangeData: Hex;
  exchangeMinReceived: bigint;
}

export async function getExpectedSharesForERC20Deposit(
  client: Client,
  args: Viem.ContractCallParameters<ERC20DepositArgs & { depositor: Address }>,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IDepositWrapper,
    address: args.depositWrapper,
    functionName: "exchangeErc20AndBuyShares",
    args: [
      args.comptrollerProxy,
      1n,
      args.inputAsset,
      args.maxInputAssetAmount,
      args.exchange,
      args.exchangeApproveTarget,
      args.exchangeData,
      args.exchangeMinReceived,
    ],
    account: args.depositor,
  });

  return result;
}

export function depositERC20(args: ERC20DepositArgs & { minSharesQuantity: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IDepositWrapper,
    address: args.depositWrapper,
    functionName: "exchangeErc20AndBuyShares",
    args: [
      args.comptrollerProxy,
      args.minSharesQuantity,
      args.inputAsset,
      args.maxInputAssetAmount,
      args.exchange,
      args.exchangeApproveTarget,
      args.exchangeData,
      args.exchangeMinReceived,
    ],
  });
}
//--------------------------------------------------------------------------------------------
// SHARES WRAPPER DEPOSIT
//--------------------------------------------------------------------------------------------

export type SharesWrapperDepositBaseParams = {
  sharesWrapper: Address;
  depositAsset: Address;
  depositAmount: bigint;
};

export async function getExpectedSharesForSharesWrapperDeposit(
  client: Client,
  args: Viem.ContractCallParameters<
    SharesWrapperDepositBaseParams & {
      depositor: Address;
    }
  >,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "deposit",
    address: args.sharesWrapper,
    args: [args.depositAsset, args.depositAmount, 1n],
    account: args.depositor,
  });

  return result;
}

export function sharesWrapperDeposit(
  args: SharesWrapperDepositBaseParams & {
    minSharesAmount: bigint;
  },
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "deposit",
    address: args.sharesWrapper,
    args: [args.depositAsset, args.depositAmount, args.minSharesAmount],
  });
}

export function sharesWrapperRequestDeposit(args: SharesWrapperDepositBaseParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "requestDeposit",
    address: args.sharesWrapper,
    args: [args.depositAsset, args.depositAmount],
  });
}

export function sharesWrapperCancelRequestDeposit(args: Omit<SharesWrapperDepositBaseParams, "depositAmount">) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "cancelRequestDeposit",
    address: args.sharesWrapper,
    args: [args.depositAsset],
  });
}

//--------------------------------------------------------------------------------------------
// SHARES WRAPPER REDEMPTION
//--------------------------------------------------------------------------------------------

export function sharesWrapperRequestRedeem(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    amount: bigint;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "requestRedeem",
    address: args.sharesWrapper,
    args: [args.amount],
  });
}

export function sharesWrapperCancelRequestRedeem(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "cancelRequestRedeem",
    address: args.sharesWrapper,
  });
}

//--------------------------------------------------------------------------------------------
// POLICY CHECK
//--------------------------------------------------------------------------------------------

export async function isAllowedDepositor(
  client: Client,
  args: Viem.ContractCallParameters<{
    allowedDepositRecipientsPolicy: Address;
    comptrollerProxy: Address;
    policyManager: Address;
    depositor: Address;
  }>,
) {
  const hasAllowedDepositorPolicy = await isEnabled(client, {
    ...args,
    policy: args.allowedDepositRecipientsPolicy,
  });

  if (!hasAllowedDepositorPolicy) {
    return true;
  }

  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IAllowedDepositRecipientsPolicy,
    functionName: "passesRule",
    address: args.allowedDepositRecipientsPolicy,
    args: [args.comptrollerProxy, args.depositor],
  });
}
