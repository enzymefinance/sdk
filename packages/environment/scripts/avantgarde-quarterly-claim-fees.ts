/**
 * Script to settle and claim all fees from funds, and optionally distribute from fee splitters.
 *
 * This script:
 * 1. For each fund, retrieves the comptroller proxy and continuous fees
 * 2. Generates transaction data to settle and claim all continuous fees
 * 3. Optionally generates transaction data to claim from fee splitters (batched per final recipient)
 *
 * Run with: npx tsx scripts/avantgarde-quarterly-claim-fees.ts
 */

import { IUnpermissionedActionsWrapper } from "@enzymefinance/abis";
import { Tools, Vault } from "@enzymefinance/sdk";
import { http, type Address, createPublicClient, encodeFunctionData } from "viem";
import { readContract } from "viem/actions";
import { mainnet } from "viem/chains";

// Configuration
const UNPERMISSIONED_ACTIONS_WRAPPER = "0xcfab4fcbfe059d5c1840d9dc285a9bfa0f96a118" as Address; // Ethereum mainnet

// Fee routing data: finalRecipient -> vaultProxy -> feeSplitters[]
// feeSplitters[] = [] means "direct to finalRecipient, no splitter hop"
export const FEE_ROUTING: Record<Address, Record<Address, Array<Address>>> = {
  // AAMB revenue wallet
  "0xE44E7B3B6836281562319db238Cd2078B3176660": {
    // Avantgarde DeFi Yield Fund
    "0xfa9fa21e2f38353b31ec7d67820f6df0b20f2a02": [
      "0x61f5c7878752f2280ed81de60c76b94da93f2064", // DeFi Yield Fund fee splitter
    ],
  },

  // Panama revenue wallet
  "0xA2c3BDDfE910dDC8e5FC1B35dBb7766b943143eb": {
    // DeFi Yield Vault (no splitter)
    "0x0f41351921ede8e61071f48fed253d96760720dd": [],

    // Rare DAO Stables (mgmt via splitter, perf direct)
    "0xea6fda3bce7000d414d76b1212fab97d9601d0b5": [
      "0x60b76bfa60402e4d9df57455367e21c8f52710e3", // Rare fee splitter
    ],

    // Rare DAO ETH (mgmt via same splitter, perf direct)
    "0x9a7a94ad1b34846b219ef75127054c0e098bba80": [
      "0x60b76bfa60402e4d9df57455367e21c8f52710e3", // Rare fee splitter
    ],

    // Gitcoin MP USDC (perf direct)
    "0x684ab039b51d1f0d1711e8f643ce12bab3234a9f": [],

    // Gitcoin MP ETH (perf direct)
    "0x39dd8968b472031ca74b1c68ee4dbf58d4982227": [],
  },
};

// Create a public client for Ethereum mainnet
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

/**
 * Get all unique vault proxies from FEE_ROUTING
 */
function getAllVaultProxies(): Array<Address> {
  const vaultProxies = new Set<Address>();
  for (const vaults of Object.values(FEE_ROUTING)) {
    for (const vaultProxy of Object.keys(vaults)) {
      vaultProxies.add(vaultProxy as Address);
    }
  }
  return Array.from(vaultProxies);
}

/**
 * Main function to generate transaction data for settling and claiming fees
 */
async function main() {
  const vaultProxies = getAllVaultProxies();

  const transactions: Array<{
    vaultProxy: Address;
    comptrollerProxy: Address;
    continuousFees: Array<Address>;
    txData: string;
  }> = [];

  // =========================================================================
  // PART 1: Settle and claim all fees from funds
  // =========================================================================

  for (let i = 0; i < vaultProxies.length; i++) {
    const vaultProxy = vaultProxies[i];
    if (!vaultProxy) {
      continue;
    }
    try {
      // Step 1: Get comptroller proxy
      const comptrollerProxy = await Vault.getComptrollerProxy(publicClient, {
        vaultProxy,
      });

      // Step 2: Get continuous fees
      const continuousFeeAddresses = await readContract(publicClient, {
        abi: IUnpermissionedActionsWrapper,
        functionName: "getContinuousFeesForFund",
        address: UNPERMISSIONED_ACTIONS_WRAPPER,
        args: [comptrollerProxy],
      });

      if (continuousFeeAddresses.length === 0) {
        continue;
      }

      // Step 3: Generate transaction data
      const settleTx = Tools.UnpermissionedActionsWrapper.invokeContinuousFeeHookAndPayoutSharesOutstandingForFund({
        unpermissionedActionsWrapper: UNPERMISSIONED_ACTIONS_WRAPPER,
        comptrollerProxy,
        fees: continuousFeeAddresses,
      });

      const txData = encodeFunctionData({
        abi: settleTx.params.abi,
        functionName: settleTx.params.functionName,
        args: settleTx.params.args,
      });

      transactions.push({
        vaultProxy,
        comptrollerProxy,
        continuousFees: continuousFeeAddresses,
        txData,
      });
    } catch (error) {
      // Error processing vault - silently continue
    }
  }

  // =========================================================================
  // Transaction data for Part 1 is stored in the transactions array
  // =========================================================================

  // =========================================================================
  // PART 2: (Optional) Distribute from fee splitters
  // =========================================================================

  // Group fee splitters by final recipient
  const feeSplitterTransactions: Array<{
    finalRecipient: Address;
    batch: Array<{
      feeSplitter: Address;
      vaultProxy: Address;
      txData: string;
    }>;
  }> = [];

  for (const [finalRecipient, vaults] of Object.entries(FEE_ROUTING)) {
    const batch: Array<{
      feeSplitter: Address;
      vaultProxy: Address;
      txData: string;
    }> = [];

    for (const [vaultProxy, feeSplitters] of Object.entries(vaults)) {
      if (feeSplitters.length === 0) {
        // Direct to final recipient, no splitter hop
        continue;
      }

      for (const feeSplitter of feeSplitters) {
        // Generate claimToken transaction for each fee splitter
        const claimTx = Tools.SharesSplitter.claimToken({
          sharesSplitter: feeSplitter,
          vaultProxy: vaultProxy as Address,
        });

        const txData = encodeFunctionData({
          abi: claimTx.params.abi,
          functionName: claimTx.params.functionName,
          args: claimTx.params.args,
        });

        batch.push({
          feeSplitter,
          vaultProxy: vaultProxy as Address,
          txData,
        });
      }
    }

    if (batch.length > 0) {
      feeSplitterTransactions.push({
        finalRecipient: finalRecipient as Address,
        batch,
      });
    }
  }

  // Fee splitter transactions are batched per final recipient

  // Fee splitter transaction data is stored in feeSplitterTransactions array

  // =========================================================================
  // SUMMARY: Transaction data is stored in transactions and feeSplitterTransactions arrays
  // =========================================================================
}

main().catch((error) => {
  process.exit(1);
});
