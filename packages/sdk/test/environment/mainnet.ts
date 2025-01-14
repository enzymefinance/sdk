import type { Chain } from "viem";
import { localhost, mainnet } from "viem/chains";
import { createSetup } from "./anvil.js";

if (process.env.VITE_ANVIL_FORK_URL === undefined) {
  throw new Error('Missing environment variable "VITE_ANVIL_FORK_URL"');
}

if (process.env.VITE_ANVIL_FORK_BLOCK_NUMBER === undefined) {
  throw new Error('Missing environment variable "VITE_ANVIL_FORK_BLOCK_NUMBER"');
}

const chain = {
  ...localhost,
  id: mainnet.id,
  contracts: mainnet.contracts,
} as const satisfies Chain;

const accounts = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
  "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
  "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
  "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
] as const;

const [ALICE, BOB, CAROL, DAVE] = accounts;

const constants = {
  // Test accounts.
  accounts,
  // Named test accounts.
  alice: ALICE,
  bob: BOB,
  carol: CAROL,
  dave: DAVE,
  // Enzyme contracts.
  fundDeployer: "0x4f1C53F096533C04d8157EFB6Bca3eb22ddC6360",
  valueInterpreter: "0xD7B0610dB501b15Bfb9B7DDad8b3869de262a327",
  feeManager: "0xAf0DFFAC1CE85c3fCe4c2BF50073251F615EefC4",
  integrationManager: "0x31329024f1a3E4a4B3336E0b1DfA74CC3FEc633e",
  externalPositionManager: "0x1e3da40f999cf47091f869ebac477d84b0827cf4",
  kilnStakingContract: "0x0816DF553a89c4bFF7eBfD778A9706a989Dd3Ce3",
  aaveV2Adapter: "0xECe6B376af7C9273cebaf6528565c47Ea2Cb8a4C",
  aaveV3Adapter: "0x9cfb64D91Ce4eB821fF8EdC1C2fdA2E89E256707",
  balancerV2Adapter: "0xAB5dA4aa08B56c7e5A9D5d8A5fF19cF09a88c305",
  auraBalancerV2LpStakingAdapter: "0x581a1E865285144c32ebd8205CA144156920b5fd",
  compoundV2Adapter: "0x6ce8095a692afF6698c3Aa8593BE3976B6b8743D",
  compoundV3Adapter: "0xFaA9B9Cc98503F51A54F6038DfdD0E43AA0Ac98e",
  convexCurveLpStakingAdapter: "0xE8943F116c974C05F637920Fff3DFE0463528D9A",
  curveExchangeAdapter: "0xC9c14a99cCF467EA1ff2e19584A5FaBA3671B8de",
  curveLiquidityAdapter: "0xEa0a896ddE31CFcB53A96ac767119B69D7B4f633",
  uniswapV2ExchangeAdapter: "0x8c36435A653041BFd65515CC82502663C1ce6F0e",
  uniswapV2LiquidityAdapter: "0xF78130AfedA6d9Df3394b34d36239aeC7FAe48d9",
  uniswapV3Adapter: "0xeD6A08E05cB4260388dc7CC60Bc5fEFcCfab2793",
  yearnVaultV2Adapter: "0x7eA777F9F6ecBf4d03Dc5323d3F057B0730Fc34a",
  managementFee: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
  erc4626Adapter: "0x64Fa106DD89F21d6e687EEbE9384637F7d54f707",
  paraswapV5Adapter: "0x871a7f0ef4917a1534e651d1fde3763a52a23ece",
  oneInchV5Adapter: "0x6c62b8f7b2fd1c60ffd3afc1a2b15d4318745677",
  zeroExV4Adapter: "0x5966cbe0167d95ea03ffad0bd9091849a52dfbd5",
  staderStakingAdapter: "0x7f1b68d5ed183cda6788a66520506eaf3544001c",
  // External contracts & misc addresses.
  balancerMinter: "0x239e55F427D44C3cc793f49bFB507ebe76638a2b",
  voteLockedCvx: "0x72a19342e8F1838460eBFCCEf09F6585e32db86E",
  curve3crvPool: "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7",
  curveFraxUsdcPool: "0xDcEF968d416a41Cdac0ED8702fAC8128A64241A2",
  curveMinter: "0xd061D61a4d941c39E5453435B6345Dc261C2fcE0",
  curveRegistry: "0x0000000022D53366457F9d5E68Ec105046FC4383",
  enzymeCouncil: "0xb270FE91e8E4b80452fBF1b4704208792A350f53",
  ethAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  uniswapV2SwapRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  uniswapV3SwapRouter: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  aaveV2AWeth: "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e",
  aaveV3AWeth: "0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8",
  aura: "0xC0c293ce456fF0ED870ADd98a0828Dd4d2903DBF",
  bal: "0xba100000625a3754423978a60c9317c58a424e3D",
  comp: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
  compoundV2CEth: "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5",
  compoundV3CWeth: "0xA17581A9E3356d9A858b789D68B4d866e593aE94",
  convexCurveFraxUsdcStakingWrapper: "0xFa325D1Aa0ad84b1513893F393D4c0CBE3435a20",
  crv: "0xD533a949740bb3306d119CC777fa900bA034cd52",
  curveFraxUsdcLp: "0x3175Df0976dFA876431C2E9eE6Bc45b65d3473CC",
  curveFraxUsdcGauge: "0xCFc25170633581Bf896CB6CDeE170e3E3Aa59503",
  cvx: "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B",
  dai: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  dpi: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
  ethx: "0xa35b1b31ce002fbf2058d22f30f95d405200a15b",
  frax: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
  idle: "0x875773784Af8135eA0ef43b5a374AaD105c5D39e",
  idleV4Weth: "0xC8E6CA6E96a326dC448307A5fDE90a0b21fd7f80",
  maWeth: "0x490bbbc2485e99989ba39b34802fafa58e26aba4",
  reth: "0xae78736Cd615f374D3085123A210448E74Fc6393",
  steth: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
  uniswapV2PoolDaiEth: "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11",
  usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  wbtc: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  yearnVaultV2Weth: "0xa258C4606Ca8206D8aA700cE2143D7db854D168c",
  staderStakingPoolManager: "0xcf5ea1b38380f6af39068375516daf40ed70d299",
} as const;

export const setupMainnet = createSetup({
  chain,
  constants,
  forkUrl: process.env.VITE_ANVIL_FORK_URL,
  forkBlockNumber: BigInt(Number(process.env.VITE_ANVIL_FORK_BLOCK_NUMBER)),
  proxyFamily: 1000,
});

// TODO: This type is a stop gap solution until we have fully ported the "environment" configuration to the sdk.
export type Constants = typeof constants;
