import type { AdapterDefinition } from "./adapters.js";
import { getAdaptersForRelease } from "./adapters.js";
import type { Asset } from "./assets.js";
import { AssetType } from "./assets.js";
import type { VersionContracts } from "./contracts.js";
import { Version, isVersion } from "./contracts.js";
import type { NetworkDefinition } from "./networks.js";
import { getNetwork } from "./networks.js";
import type {
  DeploymentDefinition,
  DeploymentNamedAssetsTokens,
  DeploymentNamedTokensAssetsArbitrum,
  DeploymentNamedTokensAssetsBase,
  DeploymentNamedTokensAssetsEthereum,
  DeploymentNamedTokensAssetsPolygon,
  DeploymentNetwork,
  ExternalContractsMapping,
  KnownAddressListIdMapping,
  KnownUintListIdMapping,
  Release,
  ReleaseDefinition,
} from "./releases.js";
import { Deployment } from "./releases.js";
import type { Address, NarrowByType } from "./types.js";
import { isNonZeroAddress } from "./utils.js";

export class EnvironmentGroup<TDeployment extends Deployment = Deployment> {
  public readonly network: NetworkDefinition<DeploymentNetwork<TDeployment>>;
  public readonly assets: Record<Address, Asset> = {};
  private environments: Partial<{
    [TVersion in Version]: Environment<TVersion, TDeployment>;
  }> = {};

  public constructor(public readonly deployment: DeploymentDefinition<TDeployment>) {
    this.network = getNetwork(deployment.network);

    for (const asset of deployment.assets.filter((item) => item.network === this.network.id)) {
      this.assets[asset.id] = asset;
    }
  }

  public hasEnvironment(version: Version): boolean;
  public hasEnvironment(address: Address): boolean;
  public hasEnvironment(versionOrAddress: Address | Version): boolean;
  public hasEnvironment(versionOrAddress: Address | Version) {
    if (isVersion(versionOrAddress)) {
      return !!this.deployment.releases[versionOrAddress];
    }

    return !!Object.values(this.deployment.releases).find((item) => item.address === versionOrAddress);
  }

  public getVersion(address: Address) {
    const release = Object.values(this.deployment.releases).find((item) => item.address === address);

    if (!release) {
      throw new Error(`Invalid release address ${address} for deployment ${this.deployment.slug}`);
    }

    return release.version;
  }

  public getEnvironment<TVersion extends Version>(version: TVersion): Environment<TVersion>;
  public getEnvironment(address: Address): Environment;
  public getEnvironment(versionOrAddress: Address | Version): Environment;
  public getEnvironment(versionOrAddress: Address | Version) {
    const version = isVersion(versionOrAddress) ? versionOrAddress : this.getVersion(versionOrAddress);

    if (!this.environments[version] && !!this.deployment.releases[version]) {
      this.environments[version] = new Environment(this.deployment, version) as any;
    }

    if (!this.environments[version]) {
      throw new Error(`Invalid release ${version} for deployment ${this.deployment.slug}`);
    }

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return this.environments[version]!;
  }

  public get sulu() {
    return this.getEnvironment(Version.SULU);
  }

  public get encore() {
    return this.getEnvironment(Version.ENCORE);
  }

  public get phoenix() {
    return this.getEnvironment(Version.PHOENIX);
  }
}

export class Environment<TVersion extends Version = Version, TDeployment extends Deployment = Deployment> {
  public readonly network: NetworkDefinition<DeploymentNetwork<TDeployment>>;
  public readonly release: ReleaseDefinition<TVersion, TDeployment>;
  public readonly contracts: VersionContracts<TVersion>;
  public readonly externalContracts: ExternalContractsMapping;
  public readonly knownAddressLists: KnownAddressListIdMapping<TDeployment>;
  public readonly knownUintLists: KnownUintListIdMapping<TDeployment>;
  public readonly assets: Record<Address, Asset> = {};
  public readonly adapters: Record<string, AdapterDefinition> = {};
  public readonly namedTokens: DeploymentNamedAssetsTokens<TDeployment>;

  private static createIsVersion<TVersion extends Version>(version: TVersion) {
    return (environment: Environment): environment is Environment<TVersion> => environment.release.version === version;
  }

  public static isSulu = Environment.createIsVersion(Version.SULU);
  public static isEncore = Environment.createIsVersion(Version.ENCORE);
  public static isPhoenix = Environment.createIsVersion(Version.PHOENIX);
  public static isVersion<TVersion extends Version>(
    version: TVersion,
    environment: Environment,
  ): environment is Environment<TVersion> {
    return environment.release.version === version;
  }

  private static createIsDeployment<TDeployment extends Deployment>(deployment: TDeployment) {
    return (environment: Environment): environment is Environment<Version, TDeployment> =>
      environment.deployment.slug === deployment;
  }

  public static isDeploymentArbitrum = Environment.createIsDeployment(Deployment.ARBITRUM);
  public static isDeploymentBase = Environment.createIsDeployment(Deployment.BASE);
  public static isDeploymentEthereum = Environment.createIsDeployment(Deployment.ETHEREUM);
  public static isDeploymentPolygon = Environment.createIsDeployment(Deployment.POLYGON);
  public static isDeploymentTestnet = Environment.createIsDeployment(Deployment.TESTNET);
  public static isDeployment<TDeployment extends Deployment>(
    deployment: TDeployment,
    environment: Environment,
  ): environment is Environment<Version, TDeployment> {
    return environment.deployment.slug === deployment;
  }

  public constructor(
    public readonly deployment: DeploymentDefinition<TDeployment>,
    public readonly version: TVersion,
  ) {
    const release = this.deployment.releases[version];

    if (!release) {
      throw new Error(`Invalid release ${version} for ${deployment.slug} deployment`);
    }

    this.externalContracts = deployment.externalContracts;
    this.knownAddressLists = deployment.knownAddressLists;
    this.knownUintLists = deployment.knownUintLists;

    const network = deployment.network;
    const assets = deployment.assets.filter((asset) => asset.network === network);

    this.release = release;
    this.contracts = release.contracts;
    this.network = getNetwork(network);

    for (const asset of assets) {
      // TODO: Consider creating a contextualized asset class here instead of doing this hack.
      this.assets[asset.id] = {
        ...asset,
        network,
        registered: asset.releases.includes(release.slug as Release),
      };
    }

    if (Environment.isDeploymentArbitrum(this)) {
      const namedTokens = {
        bal: this.getAssetAs(this.deployment.namedTokens.bal, AssetType.PRIMITIVE),
        comp: this.getAssetAs(this.deployment.namedTokens.comp, AssetType.PRIMITIVE),
        crv: this.getAssetAs(this.deployment.namedTokens.crv, AssetType.PRIMITIVE),
        cvx: this.getAssetAs(this.deployment.namedTokens.cvx, AssetType.PRIMITIVE),
        dai: this.getAssetAs(this.deployment.namedTokens.dai, AssetType.PRIMITIVE),
        grt: this.getAssetAs(this.deployment.namedTokens.grt, AssetType.PRIMITIVE),
        mln: this.getAssetAs(this.deployment.namedTokens.mln, AssetType.PRIMITIVE),
        nativeTokenWrapper: this.getAssetAs(this.network.currency.wrapper, AssetType.PRIMITIVE),
        usdt: this.getAssetAs(this.deployment.namedTokens.usdt, AssetType.PRIMITIVE),
        weth: this.getAssetAs(this.deployment.namedTokens.weth, AssetType.PRIMITIVE),
      };

      this.namedTokens = namedTokens as DeploymentNamedAssetsTokens<TDeployment> & DeploymentNamedTokensAssetsArbitrum;
    } else if (Environment.isDeploymentBase(this)) {
      const namedTokens = {
        comp: this.getAssetAs(this.deployment.namedTokens.comp, AssetType.PRIMITIVE),
        dai: this.getAssetAs(this.deployment.namedTokens.dai, AssetType.PRIMITIVE),
        mln: this.getAssetAs(this.deployment.namedTokens.mln, AssetType.PRIMITIVE),
        nativeTokenWrapper: this.getAssetAs(this.network.currency.wrapper, AssetType.PRIMITIVE),
        usdt: this.getAssetAs(this.deployment.namedTokens.usdt, AssetType.PRIMITIVE),
        weth: this.getAssetAs(this.deployment.namedTokens.weth, AssetType.PRIMITIVE),
      };

      this.namedTokens = namedTokens as DeploymentNamedAssetsTokens<TDeployment> & DeploymentNamedTokensAssetsBase;
    } else if (Environment.isDeploymentEthereum(this)) {
      const namedTokens = {
        aave: this.getAssetAs(this.deployment.namedTokens.aave, AssetType.PRIMITIVE),
        bal: this.getAssetAs(this.deployment.namedTokens.bal, AssetType.PRIMITIVE),
        ceth: this.getAssetAs(this.deployment.namedTokens.ceth, AssetType.COMPOUND_V2),
        comp: this.getAssetAs(this.deployment.namedTokens.comp, AssetType.PRIMITIVE),
        crv: this.getAssetAs(this.deployment.namedTokens.crv, AssetType.PRIMITIVE),
        cvx: this.getAssetAs(this.deployment.namedTokens.cvx, AssetType.PRIMITIVE),
        dai: this.getAssetAs(this.deployment.namedTokens.dai, AssetType.PRIMITIVE),
        diva: this.getAssetAs(this.deployment.namedTokens.diva, AssetType.PRIMITIVE),
        ethx: this.getAssetAs(this.deployment.namedTokens.ethx, AssetType.PRIMITIVE),
        grt: this.getAssetAs(this.deployment.namedTokens.grt, AssetType.PRIMITIVE),
        idle: this.getAssetAs(this.deployment.namedTokens.idle, AssetType.PRIMITIVE),
        lusd: this.getAssetAs(this.deployment.namedTokens.lusd, AssetType.PRIMITIVE),
        mln: this.getAssetAs(this.deployment.namedTokens.mln, AssetType.PRIMITIVE),
        mpl: this.getAssetAs(this.deployment.namedTokens.mpl, AssetType.PRIMITIVE),
        nativeTokenWrapper: this.getAssetAs(this.network.currency.wrapper, AssetType.PRIMITIVE),
        paxg: this.getAssetAs(this.deployment.namedTokens.paxg, AssetType.PRIMITIVE),
        ptkn_mln: this.getAssetAs(this.deployment.namedTokens.ptkn_mln, AssetType.PRIMITIVE),
        sthoundeth: this.getAssetAs(this.deployment.namedTokens.sthoundeth, AssetType.PRIMITIVE),
        stkaave: this.getAssetAs(this.deployment.namedTokens.stkaave, AssetType.PRIMITIVE),
        steth: this.getAssetAs(this.deployment.namedTokens.steth, AssetType.PRIMITIVE),
        stusd: this.getAssetAs(this.deployment.namedTokens.stusd, AssetType.ERC_4626),
        sweth: this.getAssetAs(this.deployment.namedTokens.sweth, AssetType.PRIMITIVE),
        uni: this.getAssetAs(this.deployment.namedTokens.uni, AssetType.PRIMITIVE),
        usda: this.getAssetAs(this.deployment.namedTokens.usda, AssetType.PRIMITIVE),
        usdc: this.getAssetAs(this.deployment.namedTokens.usdc, AssetType.PRIMITIVE),
        usdt: this.getAssetAs(this.deployment.namedTokens.usdt, AssetType.PRIMITIVE),
        weth: this.getAssetAs(this.deployment.namedTokens.weth, AssetType.PRIMITIVE),
      };

      this.namedTokens = namedTokens as DeploymentNamedAssetsTokens<TDeployment> & DeploymentNamedTokensAssetsEthereum;
    } else if (Environment.isDeploymentPolygon(this) || Environment.isDeploymentTestnet(this)) {
      const namedTokens = {
        aave: this.getAssetAs(this.deployment.namedTokens.aave, AssetType.PRIMITIVE),
        bal: this.getAssetAs(this.deployment.namedTokens.bal, AssetType.PRIMITIVE),
        comp: this.getAssetAs(this.deployment.namedTokens.comp, AssetType.PRIMITIVE),
        crv: this.getAssetAs(this.deployment.namedTokens.crv, AssetType.PRIMITIVE),
        cvx: this.getAssetAs(this.deployment.namedTokens.cvx, AssetType.PRIMITIVE),
        dai: this.getAssetAs(this.deployment.namedTokens.dai, AssetType.PRIMITIVE),
        eure: this.getAssetAs(this.deployment.namedTokens.eure, AssetType.PRIMITIVE),
        grt: this.getAssetAs(this.deployment.namedTokens.grt, AssetType.PRIMITIVE),
        mln: this.getAssetAs(this.deployment.namedTokens.mln, AssetType.PRIMITIVE),
        nativeTokenWrapper: this.getAssetAs(this.network.currency.wrapper, AssetType.PRIMITIVE),
        uni: this.getAssetAs(this.deployment.namedTokens.uni, AssetType.PRIMITIVE),
        usdc: this.getAssetAs(this.deployment.namedTokens.usdc, AssetType.PRIMITIVE),
        usdt: this.getAssetAs(this.deployment.namedTokens.usdt, AssetType.PRIMITIVE),
        weth: this.getAssetAs(this.deployment.namedTokens.weth, AssetType.PRIMITIVE),
      };

      this.namedTokens = namedTokens as DeploymentNamedAssetsTokens<TDeployment> & DeploymentNamedTokensAssetsPolygon;
    } else {
      throw new Error("Invalid deployment");
    }

    this.adapters = getAdaptersForRelease(this.contracts);
  }

  // TODO: Enforce the `Address` type.
  public hasAsset(address: Address | string): boolean {
    if (!isNonZeroAddress(address)) {
      throw new Error(`Invalid address ${address}`);
    }

    const hasAsset = this.assets[address.toLowerCase() as Address];

    return !!hasAsset;
  }

  // TODO: Enforce the `Address` type.
  public getAsset(address: Address | string): Asset {
    if (!this.hasAsset(address)) {
      throw new Error(`Invalid asset ${address}`);
    }

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return this.assets[address.toLowerCase() as Address]!;
  }

  public getAssetAs<TAssetType extends AssetType>(address: Address | string, type: TAssetType) {
    if (!this.hasAsset(address)) {
      throw new Error(`Invalid asset ${address}`);
    }

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const asset = this.assets[address.toLowerCase() as Address]!;

    if (asset.type !== type) {
      throw new Error(`Invalid asset type: Expected ${type} but got ${asset.type}`);
    }

    return asset as NarrowByType<Asset, TAssetType>;
  }

  public getAssets<TAssetTypes extends Array<AssetType>>(filter?: { registered?: boolean; types?: TAssetTypes }) {
    const { types, registered } = filter ?? {};

    let assets = Object.values(this.assets);

    if (typeof types !== "undefined") {
      assets = types.length > 0 ? assets.filter((item) => types.includes(item.type)) : [];
    }

    if (typeof registered !== "undefined") {
      assets = assets.filter((item) => item.registered === registered);
    }

    assets.sort((first, second) => first.name.localeCompare(second.name));

    return assets as Array<NarrowByType<Asset, TAssetTypes[number]>>;
  }

  public hasContract(name: keyof VersionContracts<TVersion>) {
    return isNonZeroAddress(this.contracts[name]);
  }

  public getContract(name: keyof VersionContracts<TVersion>) {
    if (!this.hasContract(name)) {
      throw new Error(`Missing contract ${String(name)}`);
    }

    return this.contracts[name];
  }

  public toJSON() {
    return `${this.deployment.slug}.${this.version}`;
  }

  public toString() {
    return `${this.deployment.slug}.${this.version}`;
  }
}
