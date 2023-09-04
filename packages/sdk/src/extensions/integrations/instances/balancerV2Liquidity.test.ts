import { IComptrollerLib } from "../../../../../abis/src/abis/IComptrollerLib.js";
import { IFundDeployer } from "../../../../../abis/src/abis/IFundDeployer.js";
import {
  BAL,
  BALANCER_MINTER,
  BALANCER_V2_ADAPTER,
  ENZYME_COUNCIL,
  FUND_DEPLOYER,
  INTEGRATION_MANAGER,
  WBTC,
  WETH,
} from "../../../../tests/constants.js";
import { sendTestTransaction, testActions, testClientMainnet } from "../../../../tests/globals.js";
import { TOGGLE_APPROVE_MINT_SELECTOR } from "../../../constants/selectors.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { SwapKind } from "./balancerV2Liquidity.js";
import { encodeAbiParameters, parseEther, parseUnits, zeroAddress } from "viem";
import { keccak256 } from "viem/utils";
import { expect, test } from "vitest";

const vaultProxy = "0x278C647F7cfb9D55580c69d3676938608C945ba8" as const;
const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

test("prepare adapter trade for Balancer V2 Liquidity lend should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 17962244n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: BALANCER_V2_ADAPTER,
      callArgs: {
        type: Integration.BalancerV2LiquidityLend,
        bptAmount: 961668319447558800n,
        poolId: "0x1e19cf2d73a72ef1332c882f20534b6519be0276000200000000000000000112",
        usedTokenAmounts: [1000000000000000000n],
        usedTokens: [WETH],
        request: {
          assets: ["0xae78736Cd615f374D3085123A210448E74Fc6393", WETH],
          limits: [0n, 1000000000000000000n],
          useInternalBalance: false,
          userData:
            "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000d58883dcc6b2a90000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a7640000",
        },
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: "0x1E19CF2D73a72Ef1332C882F20534B6519Be0276",
    account: vaultProxy,
    expected: 972309477646040593n,
  });
});

test("prepare adapter trade for Balancer V2 Liquidity lend and stake should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 17962244n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  const stakingToken = "0x79eF6103A513951a3b25743DB509E267685726B7";

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: BALANCER_V2_ADAPTER,
      callArgs: {
        type: Integration.BalancerV2LiquidityLendAndStake,
        bptAmount: 961668319447558800n,
        poolId: "0x1e19cf2d73a72ef1332c882f20534b6519be0276000200000000000000000112",
        stakingToken,
        usedTokenAmounts: [1000000000000000000n],
        usedTokens: [WETH],
        request: {
          assets: ["0xae78736Cd615f374D3085123A210448E74Fc6393", WETH],
          limits: [0n, 1000000000000000000n],
          useInternalBalance: false,
          userData:
            "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000d58883dcc6b2a90000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a7640000",
        },
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: stakingToken,
    account: vaultProxy,
    expected: 972686171089230020n,
  });
});

test("prepare adapter trade for Balancer V2 Liquidity unstake and redeem should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 17962403n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  const stakingToken = "0x79eF6103A513951a3b25743DB509E267685726B7";

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: BALANCER_V2_ADAPTER,
      callArgs: {
        type: Integration.BalancerV2LiquidityUnstakeAndRedeem,
        bptAmount: 500000000000000n,
        poolId: "0x1e19cf2d73a72ef1332c882f20534b6519be0276000200000000000000000112",
        usedTokenAmounts: [494004780437089n],
        stakingToken,
        usedTokens: [WETH],
        request: {
          assets: ["0xae78736Cd615f374D3085123A210448E74Fc6393", WETH],
          limits: [0n, 494004780437089n],
          useInternalBalance: false,
          userData:
            "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c6bf526340000000000000000000000000000000000000000000000000000000000000000001",
        },
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: 1384314149960940254n,
  });
});

test("prepare adapter trade for Balancer V2 Liquidity redeem should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 17962403n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: BALANCER_V2_ADAPTER,
      callArgs: {
        type: Integration.BalancerV2LiquidityRedeem,
        bptAmount: 500000000000000n,
        poolId: "0x1e19cf2d73a72ef1332c882f20534b6519be0276000200000000000000000112",
        usedTokenAmounts: [494004780437089n],
        usedTokens: [WETH],
        request: {
          assets: ["0xae78736Cd615f374D3085123A210448E74Fc6393", WETH],
          limits: [0n, 494004780437089n],
          useInternalBalance: false,
          userData:
            "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c6bf526340000000000000000000000000000000000000000000000000000000000000000001",
        },
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: 1384314149960940254n,
  });
});

test("prepare adapter trade for Balancer V2 Liquidity claim rewards should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 17962403n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // register vault call to allow approving minter by vault owner
  await sendTestTransaction({
    network: "mainnet",
    abi: IFundDeployer,
    functionName: "registerVaultCalls",
    args: [
      [BALANCER_MINTER],
      [TOGGLE_APPROVE_MINT_SELECTOR],
      [keccak256(encodeAbiParameters([{ name: "adapter", type: "address" }], [BALANCER_V2_ADAPTER]))],
    ],
    account: ENZYME_COUNCIL,
    address: FUND_DEPLOYER,
  });

  // approve minter
  await sendTestTransaction({
    network: "mainnet",
    abi: IComptrollerLib,
    functionName: "vaultCallOnContract",
    args: [
      BALANCER_MINTER,
      TOGGLE_APPROVE_MINT_SELECTOR,
      encodeAbiParameters([{ name: "adapter", type: "address" }], [BALANCER_V2_ADAPTER]),
    ],
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: BALANCER_V2_ADAPTER,
      callArgs: {
        type: Integration.BalancerV2LiquidityClaimRewards,
        stakingToken: "0x79eF6103A513951a3b25743DB509E267685726B7",
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const balBalance = await testActions.getBalanceOf({
    token: BAL,
    account: vaultProxy,
  });

  expect(balBalance).toBeGreaterThan(0n);
});

test("prepare adapter trade for Balancer V2 Liquidity take order should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 17962403n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  const outgoingAssetAmount = parseUnits("1", 8);

  await testActions.deal({ token: WBTC, to: vaultProxy, amount: outgoingAssetAmount, slotOfBalancesMapping: 0 });
  await testActions.assertBalanceOf({
    token: WBTC,
    account: vaultProxy,
    expected: outgoingAssetAmount,
  });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: BALANCER_V2_ADAPTER,
      callArgs: {
        type: Integration.BalancerV2LiquidityTakeOrder,
        swaps: [
          {
            poolId: "0xa6f548df93de924d73be7d25dc02554c6bd66db500020000000000000000000e",
            assetInIndex: 0n,
            assetOutIndex: 1n,
            amount: outgoingAssetAmount,
            userData: "0x",
          },
        ],
        assets: [WBTC, WETH],
        limits: [outgoingAssetAmount, -1n],
        kind: SwapKind.GivenIn,
        stakingTokens: [zeroAddress, zeroAddress],
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: 16598251621164189006n,
  });
});
