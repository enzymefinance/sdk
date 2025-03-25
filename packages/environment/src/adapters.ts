import { isAddressEqual, zeroAddress } from "viem";

import type { EncoreContracts, PhoenixContracts, SuluContracts, Version, VersionContracts } from "./contracts.js";
import type { Address } from "./types.js";
import { isAddress } from "./utils.js";

export enum AdapterType {
  AAVE_V2 = "aave-v2",
  AAVE_V3 = "aave-v3",
  ALPHA_HOMORA_V1 = "alpha-homora-v1",
  AURA = "aura",
  BALANCER_V2 = "balancer-v2",
  COMPOUND_V2 = "compound-v2",
  COMPOUND_V3 = "compound-v3",
  CONVEX = "convex",
  CURVE_EXCHANGE = "curve-exchange",
  CURVE_LIQUIDITY = "curve-liquidity",
  CURVE_LIQUIDITY_AAVE = "curve-liquidity-aave",
  CURVE_LIQUIDITY_EURS = "curve-liquidity-eurs",
  CURVE_LIQUIDITY_SETH = "curve-liquidity-seth",
  CURVE_LIQUIDITY_STETH = "curve-liquidity-steth",
  ERC_4626 = "erc-4626",
  IDLE = "idle",
  KYBER_NETWORK = "kyber-network",
  OLYMPUS_V2 = "olympus-v2",
  ONE_INCH_V5 = "one-inch-v5",
  PARASWAP_V4 = "paraswap-v4",
  PARASWAP_V5 = "paraswap-v5",
  PARASWAP_V6 = "paraswap-v6",
  PENDLE_V2 = "pendle-v2",
  POOLTOGETHER_V4 = "pooltogether-v4",
  SWELL_STAKING = "swell-staking",
  SYNTHETIX = "synthetix",
  THREE_ONE_THIRD = "three-one-third",
  TRACKED_ASSETS = "tracked-assets",
  UNISWAP_V2 = "uniswap-v2",
  UNISWAP_V2_LIQUIDITY = "uniswap-v2-liquidity",
  UNISWAP_V3 = "uniswap-v3",
  UNKNOWN = "unknown",
  YEARN_VAULT_V2 = "yearn-vault-v2",
  ZERO_EX_V2 = "zeroex-v2",
  ZERO_EX_V4 = "zeroex-v4",
  ZERO_EX_V4_PMM_KYC = "zeroex-v4-pmm-kyc",
  ZERO_LEND_LRT_BTC_AAVE_V3 = "zero-lend-lrt-btc-aave-v3",
  ZERO_LEND_RWA_STABLECOINS_AAVE_V3 = "zero-lend-rwa-stablecoins-aave-v3",
}

interface UnresolvedAdapterDefinition<TAdapterType extends AdapterType = AdapterType> {
  name: string;
  contractName: keyof (EncoreContracts & PhoenixContracts & SuluContracts) | undefined;
  type: TAdapterType;
}

type KnownAdapterType = Exclude<AdapterType, AdapterType.UNKNOWN>;
type UnknownAdapterType = Extract<AdapterType, AdapterType.UNKNOWN>;
type AdapterDefinitionRecord<TAdapterType extends AdapterType = AdapterType> = {
  [P in TAdapterType]: UnresolvedAdapterDefinition<P>;
};

/**
 * An adapter existing in a given environment, with the resolved address for its associated contract
 */
export interface AdapterDefinition<TAdapterType extends AdapterType = AdapterType> {
  address: Address;
  name: string;
  type: TAdapterType;
}

export function isAdapterDefinition<TAdapterType extends AdapterType>(
  adapter: unknown,
): adapter is AdapterDefinition<TAdapterType> {
  return (
    typeof adapter === "object" &&
    adapter !== null &&
    "address" in adapter &&
    isAddress(adapter.address) &&
    "name" in adapter &&
    typeof adapter.name === "string" &&
    "type" in adapter &&
    typeof adapter.type === "string" &&
    Object.values(AdapterType)
      .map((value) => value.toString())
      .includes(adapter.type)
  );
}

function isInContracts<TContracts extends EncoreContracts | PhoenixContracts | SuluContracts>(
  contractName: any,
  contracts: TContracts,
): contractName is keyof TContracts {
  return contractName in contracts;
}

export function getAdaptersForRelease<TVersion extends Version>(contracts: VersionContracts<TVersion>) {
  return Object.values(adapterDefinitions).reduce<Record<string, AdapterDefinition>>(
    (acc, { contractName, name, type }) => {
      if (typeof contractName !== "undefined" && isInContracts(contractName, contracts)) {
        const address = contracts[contractName];

        if (!isAddressEqual(address, zeroAddress)) {
          acc[address.toLowerCase()] = {
            address,
            name,
            type,
          };
        }
      }

      return acc;
    },
    {},
  );
}

const knownAdapterDefinitions: AdapterDefinitionRecord<KnownAdapterType> = {
  [AdapterType.AAVE_V2]: {
    contractName: "AaveV2Adapter",
    name: "Aave V2 Supply",
    type: AdapterType.AAVE_V2,
  },
  [AdapterType.AAVE_V3]: {
    contractName: "AaveV3Adapter",
    name: "Aave V3 Supply",
    type: AdapterType.AAVE_V3,
  },
  [AdapterType.ALPHA_HOMORA_V1]: {
    contractName: undefined,
    name: "Alpha Homora V1",
    type: AdapterType.ALPHA_HOMORA_V1,
  },
  [AdapterType.AURA]: {
    contractName: undefined,
    name: "Aura Stake",
    type: AdapterType.AURA,
  },
  [AdapterType.BALANCER_V2]: {
    contractName: "BalancerV2LiquidityAdapter",
    name: "Balancer V2",
    type: AdapterType.BALANCER_V2,
  },
  [AdapterType.COMPOUND_V2]: {
    contractName: "CompoundAdapter",
    name: "Compound Lend",
    type: AdapterType.COMPOUND_V2,
  },
  [AdapterType.COMPOUND_V3]: {
    contractName: "CompoundV3Adapter",
    name: "Compound V3 Lend",
    type: AdapterType.COMPOUND_V3,
  },
  [AdapterType.CONVEX]: {
    contractName: undefined,
    name: "Convex Stake",
    type: AdapterType.CONVEX,
  },
  [AdapterType.CURVE_EXCHANGE]: {
    contractName: "CurveExchangeAdapter",
    name: "Curve Swap",
    type: AdapterType.CURVE_EXCHANGE,
  },
  [AdapterType.CURVE_LIQUIDITY]: {
    contractName: "CurveLiquidityAdapter",
    name: "Curve Provide Liquidity",
    type: AdapterType.CURVE_LIQUIDITY,
  },
  [AdapterType.CURVE_LIQUIDITY_AAVE]: {
    contractName: undefined,
    name: "Curve Aave Pool",
    type: AdapterType.CURVE_LIQUIDITY_AAVE,
  },
  [AdapterType.CURVE_LIQUIDITY_EURS]: {
    contractName: undefined,
    name: "Curve Eurs Pool",
    type: AdapterType.CURVE_LIQUIDITY_EURS,
  },
  [AdapterType.CURVE_LIQUIDITY_SETH]: {
    contractName: undefined,
    name: "Curve Seth Pool",
    type: AdapterType.CURVE_LIQUIDITY_SETH,
  },
  [AdapterType.CURVE_LIQUIDITY_STETH]: {
    contractName: undefined,
    name: "Curve Steth Pool",
    type: AdapterType.CURVE_LIQUIDITY_STETH,
  },
  [AdapterType.ERC_4626]: {
    contractName: "ERC4626Adapter",
    name: "ERC4626",
    type: AdapterType.ERC_4626,
  },
  [AdapterType.IDLE]: {
    contractName: undefined,
    name: "Idle",
    type: AdapterType.IDLE,
  },
  [AdapterType.KYBER_NETWORK]: {
    contractName: undefined,
    name: "Kyber Network",
    type: AdapterType.KYBER_NETWORK,
  },
  [AdapterType.OLYMPUS_V2]: {
    contractName: undefined,
    name: "Olympus DAO",
    type: AdapterType.OLYMPUS_V2,
  },
  [AdapterType.ONE_INCH_V5]: {
    contractName: "OneInchV5Adapter",
    name: "1inch V5",
    type: AdapterType.ONE_INCH_V5,
  },
  [AdapterType.PARASWAP_V4]: {
    contractName: undefined,
    name: "ParaSwap V4",
    type: AdapterType.PARASWAP_V4,
  },
  [AdapterType.PARASWAP_V5]: {
    contractName: "ParaSwapV5Adapter",
    name: "ParaSwap V5",
    type: AdapterType.PARASWAP_V5,
  },
  [AdapterType.PARASWAP_V6]: {
    contractName: "ParaSwapV6Adapter",
    name: "ParaSwap V6",
    type: AdapterType.PARASWAP_V6,
  },
  [AdapterType.PENDLE_V2]: {
    contractName: "PendleV2Adapter",
    name: "Pendle V2",
    type: AdapterType.PENDLE_V2,
  },
  [AdapterType.POOLTOGETHER_V4]: {
    contractName: "PoolTogetherV4Adapter",
    name: "PoolTogether",
    type: AdapterType.POOLTOGETHER_V4,
  },
  [AdapterType.SWELL_STAKING]: {
    contractName: "SwellStakingAdapter",
    name: "Swell Staking",
    type: AdapterType.SWELL_STAKING,
  },
  [AdapterType.SYNTHETIX]: {
    contractName: "SynthetixAdapter",
    name: "Synthetix",
    type: AdapterType.SYNTHETIX,
  },
  [AdapterType.THREE_ONE_THIRD]: {
    contractName: "ThreeOneThirdAdapter",
    name: "31Third",
    type: AdapterType.THREE_ONE_THIRD,
  },
  [AdapterType.TRACKED_ASSETS]: {
    contractName: undefined,
    name: "Tracked Asset",
    type: AdapterType.TRACKED_ASSETS,
  },
  [AdapterType.UNISWAP_V2]: {
    contractName: "UniswapV2ExchangeAdapter",
    name: "Uniswap V2 Swap",
    type: AdapterType.UNISWAP_V2,
  },
  [AdapterType.UNISWAP_V2_LIQUIDITY]: {
    contractName: "UniswapV2LiquidityAdapter",
    name: "Uniswap V2 Provide Liquidity",
    type: AdapterType.UNISWAP_V2_LIQUIDITY,
  },
  [AdapterType.UNISWAP_V3]: {
    contractName: "UniswapV3Adapter",
    name: "Uniswap V3 Swap",
    type: AdapterType.UNISWAP_V3,
  },
  [AdapterType.YEARN_VAULT_V2]: {
    contractName: "YearnVaultV2Adapter",
    name: "Yearn",
    type: AdapterType.YEARN_VAULT_V2,
  },
  [AdapterType.ZERO_EX_V2]: {
    contractName: "ZeroExV2Adapter",
    name: "0x V2",
    type: AdapterType.ZERO_EX_V2,
  },
  [AdapterType.ZERO_EX_V4]: {
    contractName: "ZeroExV4Adapter",
    name: "0x V4",
    type: AdapterType.ZERO_EX_V4,
  },
  [AdapterType.ZERO_EX_V4_PMM_KYC]: {
    contractName: "ZeroExV4AdapterPmm2Kyc",
    name: "0x V4",
    type: AdapterType.ZERO_EX_V4_PMM_KYC,
  },
  [AdapterType.ZERO_LEND_LRT_BTC_AAVE_V3]: {
    contractName: "ZeroLendLRTBTCAaveV3Adapter",
    name: "Zero Lend LRT BTC Supply",
    type: AdapterType.ZERO_LEND_LRT_BTC_AAVE_V3,
  },
  [AdapterType.ZERO_LEND_RWA_STABLECOINS_AAVE_V3]: {
    contractName: "ZeroLendRWAStablecoinsAaveV3Adapter",
    name: "Zero Lend RWA Stablecoins Supply",
    type: AdapterType.ZERO_LEND_RWA_STABLECOINS_AAVE_V3,
  },
} as const;

const unknownAdapterDefinitions: AdapterDefinitionRecord<UnknownAdapterType> = {
  [AdapterType.UNKNOWN]: {
    contractName: undefined,
    name: "Unknown",
    type: AdapterType.UNKNOWN,
  },
} as const;

export const adapterDefinitions: AdapterDefinitionRecord = {
  ...knownAdapterDefinitions,
  ...unknownAdapterDefinitions,
};
