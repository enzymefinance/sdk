import { getAddress } from "viem";
import { expect, suite, test } from "vitest";
import { Version } from "../src/contracts.js";
import { getEnvironment } from "../src/deployments/all.js";
import { Environment } from "../src/environment.js";
import { AssetType, Deployment, Network, networks } from "../src/index.js";

suite("Environment", () => {
  const environment = getEnvironment(Deployment.ETHEREUM);
  const assets = environment.deployment.assets;
  const network = networks[Network.ETHEREUM];
  const wrapper = network.currency.wrapper;

  test("fetching an invalid address throws", () => {
    expect(() => environment.getAsset("not a valid address")).toThrow("Invalid address");
  });

  test("properly initializes the native token wrapper", () => {
    const asset = assets.find((item) => item.id === wrapper);

    expect(environment.namedTokens.nativeTokenWrapper).toMatchObject({ ...asset, registered: true });
  });

  test("can fetch asset by address", () => {
    const asset = assets.find((item) => item.id === wrapper);

    expect(environment.getAsset(wrapper)).toMatchObject({ ...asset, registered: true });
  });

  test("can fetch asset by address checksum", () => {
    const asset = assets.find((item) => item.id === wrapper);
    const checksum = getAddress(wrapper);

    expect(environment.getAsset(checksum)).toMatchObject({ ...asset, registered: true });
  });

  test("can check if asset exists using address", () => {
    expect(environment.hasAsset(wrapper)).toBe(true);
  });

  test("can check if asset exists using address checksum", () => {
    const checksum = getAddress(wrapper);

    expect(environment.hasAsset(checksum)).toBe(true);
  });

  test("can check if asset does not exist", () => {
    const address = "0x9e5bd9d9fad182ff0a93ba8085b664bcab00fa68"; // DINGER should not exist. Or does it?

    expect(environment.hasAsset(address)).toBe(false);
  });

  test("can filter assets by type", () => {
    const all = environment.getAssets();

    expect(all).toContainEqual(expect.objectContaining({ type: AssetType.AAVE_V2 }));
  });

  test("can filter assets by multiple types", () => {
    const filtered = environment.getAssets({
      types: [AssetType.AAVE_V2, AssetType.PRIMITIVE],
    });

    expect(filtered).toContainEqual(expect.objectContaining({ type: AssetType.AAVE_V2 }));
    expect(filtered).toContainEqual(expect.objectContaining({ type: AssetType.PRIMITIVE }));
    expect(filtered).not.toContainEqual(expect.objectContaining({ type: AssetType.COMPOUND_V2 }));
  });

  test("can filter assets by registered status", () => {
    const filtered = environment.getAssets({
      registered: true,
    });

    expect(filtered).toContainEqual(expect.objectContaining({ registered: true }));
    expect(filtered).not.toContainEqual(expect.objectContaining({ registered: false }));
  });

  test("can filter assets by registered status & types", () => {
    const filtered = environment.getAssets({
      registered: true,
      types: [AssetType.PRIMITIVE],
    });

    expect(filtered).toContainEqual(expect.objectContaining({ registered: true, type: AssetType.PRIMITIVE }));
    expect(filtered).not.toContainEqual(expect.objectContaining({ registered: false }));
    expect(filtered).not.toContainEqual(expect.objectContaining({ type: AssetType.AAVE_V2 }));
  });

  test("can fetch environment by network", () => {
    expect(getEnvironment(Network.ETHEREUM)).toBeInstanceOf(Environment);
    // expect(getEnvironment(Network.POLYGON)).toBeInstanceOf(Environment);
  });

  test("can fetch environment by deployment", () => {
    expect(getEnvironment(Deployment.ETHEREUM)).toBeInstanceOf(Environment);
    // expect(getEnvironment(Network.POLYGON)).toBeInstanceOf(Environment);
  });

  test("can fetch specific deployment version", () => {
    const env = getEnvironment(Deployment.ETHEREUM, Version.ENCORE);

    expect(env).toBeInstanceOf(Environment);
    expect(env.version).toBe(Version.ENCORE);
  });

  test("fetching an unknown environment throws", () => {
    expect(() => getEnvironment("does-not-exist" as any)).toThrowError("Failed to find");
    expect(() => getEnvironment("does-not-exist" as any, Version.SULU)).toThrowError("Failed to find");
    expect(() => getEnvironment(Network.ETHEREUM, "does-not-exist" as any)).toThrowError("Failed to find");
    expect(() => getEnvironment(Network.ETHEREUM, "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce")).toThrowError(
      "Failed to find",
    );
  });

  test("properly gets external contract address", () => {
    expect(environment.externalContracts.aaveV2IncentivesController).toBe("0xd784927ff2f95ba542bfc824c8a8a98f3495f6b5");
  });

  test("properly gets token by symbol", () => {
    expect(environment.namedTokens.dai).toBe(
      environment.getAssetAs(environment.deployment.namedTokens.dai, AssetType.PRIMITIVE),
    );
  });
});
