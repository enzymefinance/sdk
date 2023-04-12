import { test, expect } from "vitest";
import { encodeFeeSettings, decodeFeeSettings } from "./settings.js";
import { encodeManagementFeeSettings, encodePerformanceFeeSettings } from "./index.js";
import { toBps } from "src/index.js";

test("encodeFeeSettings should work correctly", () => {
  expect(
    encodeFeeSettings([
      {
        address: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
        settings: encodePerformanceFeeSettings({ feeRateInBps: toBps(0.1) }),
      },
      {
        address: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
        settings: encodeManagementFeeSettings({ perAnnumRateInBps: toBps(0.1) }),
      },
    ]),
  ).toEqual(
    "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000fedc73464dfd156d30f6524654a5d56e766da0c3000000000000000000000000faf2c3db614e9d38fe05edc634848be7ff0542b90000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003e8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000033b2e3cce25d9e52486e3880000000000000000000000000000000000000000000000000000000000000000",
  );
});

test("decodeFeeSettings should work correctly", () => {
  const encoded = encodeFeeSettings([
    {
      address: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
      settings: encodePerformanceFeeSettings({ feeRateInBps: toBps(0.1) }),
    },
    {
      address: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
      settings: encodeManagementFeeSettings({ perAnnumRateInBps: toBps(0.1) }),
    },
  ]);

  const decoded = [
    {
      address: "0xfeDC73464Dfd156d30F6524654a5d56E766DA0c3",
      settings:
        "0x00000000000000000000000000000000000000000000000000000000000003e80000000000000000000000000000000000000000000000000000000000000000",
    },
    {
      address: "0xFaF2c3DB614E9d38fE05EDc634848BE7Ff0542B9",
      settings:
        "0x0000000000000000000000000000000000000000033b2e3cce25d9e52486e3880000000000000000000000000000000000000000000000000000000000000000",
    },
  ];

  expect(decodeFeeSettings(encoded)).toEqual(decoded);
});
