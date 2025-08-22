import { Portfolio } from "@enzymefinance/sdk";
import { type Address, encodeFunctionData, zeroAddress } from "viem";
import { test } from "vitest";

/**
 * Enzyme MysoV3 Option Vault Lifecycle — Quick Docs
 *
 * Script: sdk\packages\sdk\test\tests\Portfolio\Integrations\MysoV3.test.ts
 *
 * ─── RUN ──────────────────────────────────────────────────────────────────────
 *   npx vitest sdk\packages\sdk\test\tests\Portfolio\Integrations\MysoV3.test.ts
 *
 * ─── MOST IMPORTANT TEST CASES (REFERENCES) ─────────────────────────────────────────────────
 * 1) create escrow by taking quote              → test("create escrow by taking quote")
 * 2) close & sweep expired escrows              → test("sweep escrow")
 * 3) withdraw (without close)                   → see below
 *
 * Each test prints:
 *   console.log({ to: populatedTx.params.address, txData: encodeFunctionData(populatedTx.params) })
 * Use these outputs for simulation/broadcast (see below).
 *
 * ─── WITHDRAW ONLY (NO CLOSE) ────────────────────────────────────────────────
 * After sweeping (or if tokens are held outside an escrow close), withdraw coins with:
 *   Portfolio.Integrations.MysoV3.withdrawTokensFromEscrows({
 *     comptrollerProxy,
 *     externalPositionManager,
 *     externalPositionProxy,
 *     callArgs: {
 *       escrowIdxs: [indices to withdraw from],
 *       tokens:     [ERC20 addresses to withdraw],
 *     },
 *   });
 *
 * ─── BROADCAST FLOW (SIMULATE → SEND) ─────────────────────────────────────────
 * 1) Simulate on Tenderly using the console output:
 *    - to:   "to"
 *    - data: "txData"
 *    - from (authorized):
 *        0xF75a212A5d5c3e208B9694bc854dEa7A942908eC
 *        0x475E5d4d5f3734DaCEb2133d5eB747D795a1BF55
 *
 * 2) Broadcast via MetaMask:
 *    - Send 0 ETH → paste "to" → expand Hex Data → paste "txData".
 *    - If Submit is greyed out, toggle the recipient address once.
 *
 * ─── FIND ESCROW INDEX (FOR SWEEP/WITHDRAW) ──────────────────────────────────
 *   Etherscan (Router "getEscrows" paginated):
 *   https://etherscan.io/address/0xE442B5A7746C0DFB3e57de62ccB5f2Bc4f7caa72#readContract#F3
 *   → Locate your vault's escrow address and note its index → use in escrowIdxs.
 *
 * ─── VIEW ESCROWS IN UI ──────────────────────────────────────────────────────
 *   Myso UI (external position = owner of escrows by default):
 *   https://www.myso.finance/user/escrows?view=0x06B5227c5a40628C149Ab242359c87B922AD1891
 *   Replace the address with your externalPositionProxy to see its escrows.
 */

// To run: npx vitest {fileName}

// Avantgarde BTC Yield
const avantgardeBtcYield: Record<string, Address> = {
  comptrollerProxy: "0xf6ac6a89a1a9f129a9149d52dca1e1b9600ca6fb",
  externalPositionManager: "0x1e3da40f999cf47091f869ebac477d84b0827cf4",
  externalPositionProxy: "0x858e03A66D99e3032818Ec899Cc3f24886502Ccc",
  vaultProxy: "0x59d581cdf5b2e1dabca66d5377ce01dd2684ec3a",
};

// Avantgarde MLN Yield
const avantgardeMlnYield: Record<string, Address> = {
  comptrollerProxy: "0x778244a89f629Ff88D2e44FD4d3e1AfaD352159E",
  externalPositionManager: "0x1e3da40f999cf47091f869ebac477d84b0827cf4",
  externalPositionProxy: "0x06B5227c5a40628C149Ab242359c87B922AD1891",
  vaultProxy: "0xe31285ba11ae2e48c8e967ad21ac2fd95f1d11d0",
};

test.skip("create MysoV3 external position", () => {
  const { comptrollerProxy, externalPositionManager } = avantgardeMlnYield;
  // Create the external position
  const populatedTx = Portfolio.Integrations.MysoV3.create({
    comptrollerProxy,
    externalPositionManager,
    typeId: 22n,
  });

  console.log({ to: populatedTx.params.address, txData: encodeFunctionData(populatedTx.params) });
});

test.skip("create escrow by taking quote", () => {
  // Take a MysoV3 Escrow by taking a quote
  // TODO: replace with quote
  const { comptrollerProxy, externalPositionManager, externalPositionProxy } = avantgardeMlnYield;
  const rfqInitialization: Portfolio.Integrations.MysoV3.RFQInitialization = {
    optionInfo: {
      underlyingToken: "0xec67005c4e498ec7f55e092bd1d35cbc47c91892",
      expiry: 1755263160,
      settlementToken: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      earliestExercise: 1752670500,
      notional: 15000000000000000000000n,
      strike: 10142600n,
      advancedSettings: {
        borrowCap: 1000000000000000000n,
        oracle: "0x0000000000000000000000000000000000000000",
        premiumTokenIsUnderlying: false,
        votingDelegationAllowed: false,
        allowedDelegateRegistry: "0x0000000000000000000000000000000000000000",
      },
    },
    rfqQuote: {
      premium: 1972500000n,
      validUntil: 1752672180n,
      eip1271Maker: "0x0000000000000000000000000000000000000000",
      signature:
        "0xea0e50749261ea06ed3e25022d48eb3fa6f0e7dbae32ec65147eee18696efcda518d3d955fca6fd6ecffd4bf0e9a79d31dca832b25199585d2855dc9c93376cf1b",
    },
  };
  const populatedTx = Portfolio.Integrations.MysoV3.createEscrowByTakingQuote({
    comptrollerProxy,
    externalPositionManager,
    externalPositionProxy,
    callArgs: { distPartner: zeroAddress, rfqInitialization },
  });

  console.log({ to: populatedTx.params.address, txData: encodeFunctionData(populatedTx.params) });
});

test("sweep escrow", () => {
  const { comptrollerProxy, externalPositionManager, externalPositionProxy } = avantgardeMlnYield;
  const populatedTx = Portfolio.Integrations.MysoV3.closeAndSweepEscrows({
    comptrollerProxy,
    externalPositionManager,
    externalPositionProxy,
    callArgs: { escrowIdxs: [78], skipWithdrawFromEscrow: false },
  });

  console.log({ to: populatedTx.params.address, txData: encodeFunctionData(populatedTx.params) });
});
