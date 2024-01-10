import { Asset } from "@enzymefinance/sdk";
import { TestSetup } from "@enzymefinance/sdk/test";
import { expect, test } from "vitest";

const environment = TestSetup.mainnet();

test("DAI name should be correct", async () => {
  const dai = environment.constants.dai;

  const name = Asset.getName(environment.client, {
    asset: dai,
  });

  expect(name).resolves.toBe("Dai Stablecoin");
});

test("MKR name should be correct", async () => {
  const mkr = "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2";

  const name = Asset.getName(environment.client, {
    asset: mkr,
  });

  expect(name).resolves.toBe("Maker");
});

test("DAI symbol should be correct", async () => {
  const dai = environment.constants.dai;

  const symbol = Asset.getSymbol(environment.client, {
    asset: dai,
  });

  expect(symbol).resolves.toBe("DAI");
});

test("MKR symbol should be correct", async () => {
  const mkr = "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2";

  const symbol = Asset.getSymbol(environment.client, {
    asset: mkr,
  });

  expect(symbol).resolves.toBe("MKR");
});
