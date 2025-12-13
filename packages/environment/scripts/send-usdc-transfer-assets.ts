/**
 * Script to generate transaction data for sending USDC from two vaults
 * via the TransferAssetsAdapter on Ethereum mainnet.
 *
 * Run with: npx tsx scripts/send-usdc-transfer-assets.ts
 */

import { Portfolio } from "@enzymefinance/sdk";
import { type Address, encodeFunctionData } from "viem";

// Recipient of the USDC transfers
const RECIPIENT = "0x6fc727e229d8b26eeeb979322d84449c1bb51294" as Address;

// Ethereum mainnet USDC (6 decimals)
const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" as Address;

// Sulu release addresses on Ethereum mainnet
const INTEGRATION_MANAGER = "0x31329024f1a3e4a4b3336e0b1dfa74cc3fec633e" as Address;
const TRANSFER_ASSETS_ADAPTER = "0xe0309fa2412b811a0bd40a73297093707259217f" as Address;

// Transfers to perform (amounts in USDC's 6-decimal units)
const TRANSFERS: Array<{
  vaultProxy: Address;
  comptrollerProxy: Address;
  amount: bigint;
}> = [
  {
    vaultProxy: "0xfa9fa21e2f38353b31ec7d67820f6df0b20f2a02" as Address,
    comptrollerProxy: "0xa0bC8040cb1314542B58989fd54a78620d23895C" as Address,
    amount: 7_482_960_000n, // 7,482.96 USDC
  },
  {
    vaultProxy: "0x249c85ece2dcf985ced87f4593c7398eb9881269" as Address,
    comptrollerProxy: "0x16D6ed99d0197d938cfA68b62f8d9411Af12A975" as Address,
    amount: 9_050_000_000n, // 9,050.00 USDC
  },
];

function formatUsdc(amount: bigint): string {
  const whole = amount / 1_000_000n;
  const fraction = amount % 1_000_000n;
  return `${whole}.${fraction.toString().padStart(6, "0")}`.replace(/\.0+$/, "");
}

function main() {
  TRANSFERS.forEach((transfer, idx) => {
    const populated = Portfolio.Integrations.TransferAssets.transfer({
      comptrollerProxy: transfer.comptrollerProxy,
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: TRANSFER_ASSETS_ADAPTER,
      callArgs: {
        recipient: RECIPIENT,
        assetAddresses: [USDC],
        assetAmounts: [transfer.amount],
      },
    });

    const txData = encodeFunctionData({
      abi: populated.params.abi,
      functionName: populated.params.functionName,
      args: populated.params.args,
    });
  });
}

main();
