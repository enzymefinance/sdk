// Mainnet contracts
export const FUND_DEPLOYER = "0x4f1C53F096533C04d8157EFB6Bca3eb22ddC6360" as const;
export const VALUE_INTERPRETER = "0xD7B0610dB501b15Bfb9B7DDad8b3869de262a327" as const;
export const FEE_MANAGER = "0xAf0DFFAC1CE85c3fCe4c2BF50073251F615EefC4" as const;
export const INTEGRATION_MANAGER = "0x31329024f1a3E4a4B3336E0b1DfA74CC3FEc633e" as const;
export const EXTERNAL_POSITION_MANAGER = "0x1e3da40f999cf47091f869ebac477d84b0827cf4" as const;
export const KILN_STAKING_CONTRACT = "0x0816DF553a89c4bFF7eBfD778A9706a989Dd3Ce3" as const;
export const AAVE_V2_ADAPTER = "0xECe6B376af7C9273cebaf6528565c47Ea2Cb8a4C" as const;
export const AAVE_V3_ADAPTER = "0x9cfb64D91Ce4eB821fF8EdC1C2fdA2E89E256707" as const;
export const COMPOUND_V2_ADAPTER = "0x6ce8095a692afF6698c3Aa8593BE3976B6b8743D" as const;
export const COMPOUND_V3_ADAPTER = "0xFaA9B9Cc98503F51A54F6038DfdD0E43AA0Ac98e" as const;
export const CURVE_LIQUIDITY_ADAPTER = "0xEa0a896ddE31CFcB53A96ac767119B69D7B4f633" as const;
export const IDLE_V4_ADAPTER = "0x474c8d4A0e53B7235C6f8fC27c9B6406a32Dd0b1" as const;
export const UNISWAP_V2_LIQUIDITY_ADAPTER = "0xF78130AfedA6d9Df3394b34d36239aeC7FAe48d9" as const;
export const YEARN_VAULT_V2_ADAPTER = "0x7eA777F9F6ecBf4d03Dc5323d3F057B0730Fc34a" as const;
export const MANAGEMENT_FEE = "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9" as const;
export const IDLE_V4_PRICE_FEED = "0x8Ddf1f3f0c13E099378B2B6F73cdB8F61526ed6F" as const;

export const CURVE_3CRV_POOL = "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7" as const;
export const CURVE_FRAX_USDC_POOL = "0xDcEF968d416a41Cdac0ED8702fAC8128A64241A2" as const;
export const CURVE_FRAX_USDC_LP = "0x3175Df0976dFA876431C2E9eE6Bc45b65d3473CC" as const;
export const CURVE_FRAX_USDC_GAUGE = "0xCFc25170633581Bf896CB6CDeE170e3E3Aa59503" as const;

export const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F" as const;
export const IDLE = "0x875773784Af8135eA0ef43b5a374AaD105c5D39e" as const;
export const COMP = "0xc00e94Cb662C3520282E6f5717214004A7f26888" as const;
export const CRV = "0xD533a949740bb3306d119CC777fa900bA034cd52" as const;
export const FRAX = "0x853d955aCEf822Db058eb8505911ED77F175b99e" as const;
export const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as const;
export const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" as const;
export const AAVE_V2_A_WETH = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e" as const;
export const AAVE_V3_A_WETH = "0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8" as const;
export const COMPOUND_V2_C_ETH = "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5" as const;
export const COMPOUND_V3_C_WETH = "0xA17581A9E3356d9A858b789D68B4d866e593aE94" as const;
export const IDLE_V4_WETH = "0xC8E6CA6E96a326dC448307A5fDE90a0b21fd7f80" as const;
export const UNISWAP_V2_POOL_DAI_ETH = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11" as const;
export const YEARN_VAULT_V2_WETH = "0xa258C4606Ca8206D8aA700cE2143D7db854D168c" as const;

// Test accounts
export const ACCOUNTS = [
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

// Named accounts
export const [ALICE, BOB, CAROL, DAVE] = ACCOUNTS;

// Special accounts
export const USDC_HOLDER = "0x7713974908Be4BEd47172370115e8b1219F4A5f0";

if (process.env.VITE_ANVIL_FORK_URL === undefined) {
  throw new Error('Missing environment variable "VITE_ANVIL_FORK_URL"');
}

export const FORK_URL = process.env.VITE_ANVIL_FORK_URL;

if (process.env.VITE_ANVIL_FORK_BLOCK_NUMBER === undefined) {
  throw new Error('Missing environment variable "VITE_ANVIL_FORK_BLOCK_NUMBER"');
}

export const FORK_BLOCK_NUMBER = BigInt(Number(process.env.VITE_ANVIL_FORK_BLOCK_NUMBER));
