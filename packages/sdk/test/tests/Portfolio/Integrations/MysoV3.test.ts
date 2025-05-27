import { Portfolio } from "@enzymefinance/sdk";
import { type Address, encodeFunctionData, zeroAddress } from "viem";
import { test } from "vitest";

// To run: npx vitest {fileName}

// Avantgarde BTC Yield
const comptrollerProxy: Address = "0xf6ac6a89a1a9f129a9149d52dca1e1b9600ca6fb";
const externalPositionManager = "0x1e3da40f999cf47091f869ebac477d84b0827cf4";
const externalPositionProxy = "0x858e03A66D99e3032818Ec899Cc3f24886502Ccc";

test("create MysoV3 external position", () => {
  // Create the external position
  const populatedTx = Portfolio.Integrations.MysoV3.create({
    comptrollerProxy,
    externalPositionManager,
    typeId: 22n,
  });

  console.log({ to: populatedTx.params.address, txData: encodeFunctionData(populatedTx.params) });
});

test("create escrow by taking quote", () => {
  // Take a MysoV3 Escrow by taking a quote
  // TODO: replace with quote
  const rfqInitialization: Portfolio.Integrations.MysoV3.RFQInitialization = undefined as any;
  const populatedTx = Portfolio.Integrations.MysoV3.createEscrowByTakingQuote({
    comptrollerProxy,
    externalPositionManager,
    externalPositionProxy,
    callArgs: { distPartner: zeroAddress, rfqInitialization },
  });

  console.log({ to: populatedTx.params.address, txData: encodeFunctionData(populatedTx.params) });
});
