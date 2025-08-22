import { Portfolio } from "@enzymefinance/sdk";
import { type Address, encodeFunctionData, zeroAddress } from "viem";
import { test } from "vitest";

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
