/**
 * Script to generate transaction data for sending USDC from two vaults
 * via the TransferAssetsAdapter on Ethereum mainnet.
 *
 * Run with: npx tsx scripts/send-usdc-transfer-assets.ts
 */

import { Portfolio } from "@enzymefinance/sdk";
import { type Address, encodeFunctionData } from "viem";
// Ethereum mainnet USDC (6 decimals)
const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" as Address;

// Sulu release addresses on Ethereum mainnet
const INTEGRATION_MANAGER = "0x31329024f1a3e4a4b3336e0b1dfa74cc3fec633e" as Address;
const TRANSFER_ASSETS_ADAPTER = "0xe0309fa2412b811a0bd40a73297093707259217f" as Address;

// Transfers to perform (amounts in USDC's 6-decimal units)
const TRANSFERS: Array<{
  recipient: Address;
  vaultProxy: Address;
  comptrollerProxy: Address;
  amount: bigint;
}> = [
  {
    recipient: "0x6Fc727E229D8b26eeEb979322D84449c1Bb51294" as Address,
    vaultProxy: "0xfa9fa21e2f38353b31ec7d67820f6df0b20f2a02" as Address,
    comptrollerProxy: "0xa0bC8040cb1314542B58989fd54a78620d23895C" as Address,
    amount: 9_083_330_000n, // 9,083.33 USDC
  },
];

function formatUsdc(amount: bigint): string {
  const whole = amount / 1_000_000n;
  const fraction = amount % 1_000_000n;
  return `${whole}.${fraction.toString().padStart(6, "0")}`.replace(/\.0+$/, "");
}

function main() {
  console.log("=".repeat(70));
  console.log("USDC TRANSFERS VIA TRANSFER ASSETS ADAPTER (ETHEREUM)");
  console.log("=".repeat(70));
  console.log();
  console.log("USDC:", USDC);
  console.log("IntegrationManager:", INTEGRATION_MANAGER);
  console.log("TransferAssetsAdapter:", TRANSFER_ASSETS_ADAPTER);
  console.log();

  TRANSFERS.forEach((transfer, idx) => {
    const populated = Portfolio.Integrations.TransferAssets.transfer({
      comptrollerProxy: transfer.comptrollerProxy,
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: TRANSFER_ASSETS_ADAPTER,
      callArgs: {
        recipient: transfer.recipient,
        assetAddresses: [USDC],
        assetAmounts: [transfer.amount],
      },
    });

    const txData = encodeFunctionData({
      abi: populated.params.abi,
      functionName: populated.params.functionName,
      args: populated.params.args,
    });

    console.log("-".repeat(70));
    console.log(`TX ${idx + 1}: Send USDC`);
    console.log(`  Recipient: ${transfer.recipient}`);
    console.log(`  Vault Proxy: ${transfer.vaultProxy}`);
    console.log(`  Comptroller Proxy: ${transfer.comptrollerProxy}`);
    console.log(`  Amount: ${formatUsdc(transfer.amount)} USDC`);
    console.log(`  To (call target): ${populated.params.address}`);
    console.log(`  Data: ${txData}`);
    console.log();
  });

  console.log("Done. Review and submit the above transactions from the vault owner.");
}

main();
