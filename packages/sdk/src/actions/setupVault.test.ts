import { IVault } from "@enzymefinance/abis";
import { expect, test } from "vitest";
import { decodeSetupVaultParams, prepareSetupVaultParams, type PrepareSetupVaultParamsArgs } from "./setupVault.js";
import { toBps, toSeconds, toWei } from "../utils/conversion.js";
import { encodePerformanceFeeSettings } from "../fees/fees/performanceFee.js";
import { encodeManagementFeeSettings } from "../fees/fees/managementFee.js";
import { encodeMinMaxInvestmentPolicySettings } from "../policies/policies/minMaxInvestmentPolicy.js";
import { DEPLOYER, VITALIK } from "../../tests/constants.js";
import { encodeFunctionData, getAddress } from "viem";
import { publicClient, sendTestTransaction } from "../../tests/globals.js";

test("should set up a vault with the given parameters", async () => {
  const {
    result: [_, vaultProxy],
  } = await sendTestTransaction({
    account: VITALIK,
    address: DEPLOYER,
    ...prepareSetupVaultParams({
      vaultOwner: VITALIK,
      vaultName: "Test Vault",
      vaultSymbol: "TEST",
      denominationAsset: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      sharesActionTimelock: toSeconds({ days: 1 }),
      feeSettings: [
        {
          address: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
          settings: encodePerformanceFeeSettings({
            feeRateInBps: toBps(0.1),
          }),
        },
        {
          address: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
          settings: encodeManagementFeeSettings({
            perAnnumRateInBps: toBps(0.1),
          }),
        },
      ],
      policySettings: [
        {
          address: "0xebdadfc929c357d12281118828aea556db5be30c",
          settings: encodeMinMaxInvestmentPolicySettings({
            minInvestmentAmount: toWei(10),
            maxInvestmentAmount: toWei(500),
          }),
        },
      ],
    }),
  });

  const vaultOwner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getOwner",
  });

  expect(vaultOwner).toBe(VITALIK);
});

test("decode setup vault params should work correctly", () => {
  const params: PrepareSetupVaultParamsArgs = {
    vaultOwner: VITALIK,
    vaultName: "Test Vault",
    vaultSymbol: "TEST",
    denominationAsset: getAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"),
    sharesActionTimelock: toSeconds({ days: 1 }),
    feeSettings: [
      {
        address: getAddress("0xfedc73464dfd156d30f6524654a5d56e766da0c3"),
        settings: encodePerformanceFeeSettings({
          feeRateInBps: toBps(0.1),
        }),
      },
      {
        address: getAddress("0xfaf2c3db614e9d38fe05edc634848be7ff0542b9"),
        settings: encodeManagementFeeSettings({
          perAnnumRateInBps: toBps(0.1),
        }),
      },
    ],
    policySettings: [
      {
        address: getAddress("0xebdadfc929c357d12281118828aea556db5be30c"),
        settings: encodeMinMaxInvestmentPolicySettings({
          minInvestmentAmount: toWei(10),
          maxInvestmentAmount: toWei(500),
        }),
      },
    ],
  };

  const prepared = prepareSetupVaultParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeSetupVaultParams(encoded);

  expect(decoded).toEqual(params);
});
