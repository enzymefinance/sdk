import {
  encodeFeeSettings,
  encodePerformanceFeeSettings,
  prepareSetupVaultParams,
  toBps,
  toSeconds,
} from "@enzymefinance/sdk";
import { createPublicClient, http } from "viem";
import { mainnet, polygon } from "viem/chains";

export const publicClients = {
  mainnet: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
  polygon: createPublicClient({
    chain: polygon,
    transport: http(),
  }),
};

const vitalik = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";

const {
  result: [comptrollerProxy, vaultProxy],
} = await publicClients.mainnet.simulateContract({
  account: vitalik,
  address: "0x4f1c53f096533c04d8157efb6bca3eb22ddc6360",
  ...prepareSetupVaultParams({
    vaultSymbol: "TEST",
    vaultName: "Test Vault",
    vaultOwner: vitalik,
    denominationAsset: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    sharesActionTimelock: toSeconds({ days: 1 }),
    feeSettings: encodeFeeSettings([
      {
        address: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
        settings: encodePerformanceFeeSettings({ feeRateInBps: toBps(0.1) }),
      },
    ]),
  }),
});

// rome-ignore lint/nursery/noConsoleLog: this is fine ...
console.log({
  comptrollerProxy,
  vaultProxy,
});
