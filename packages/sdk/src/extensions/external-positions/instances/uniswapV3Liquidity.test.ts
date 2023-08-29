import { IUniswapV3LiquidityPositionLib } from "../../../../../abis/src/abis/IUniswapV3LiquidityPositionLib.js";
import { EXTERNAL_POSITION_MANAGER, WETH } from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";

import {
  decodeUniswapV3LiquidityAddLiquidityArgs,
  decodeUniswapV3LiquidityCollectArgs,
  decodeUniswapV3LiquidityMintArgs,
  decodeUniswapV3LiquidityPurgeArgs,
  decodeUniswapV3LiquidityRemoveLiquidityArgs,
} from "./uniswapV3Liquidity.js";
import { parseEther } from "viem";
import { expect, test } from "vitest";

test("prepare external position trade for Uniswap V3 Liquidity mint should work correctly", async () => {
  const comptrollerProxy = "0x05d6c4df0aa92aae4b240b1da64fffefe6a07e48" as const;
  const vaultOwner = "0x55be2a08954778744ae0b92e7344e126c6104eb2" as const;

  await testClient.reset({
    blockNumber: 16815320n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x0141f350e7bcd8eb24d77482f895f8ee105b93a122a3a414bee30459ad641d3f
  const callArgs =
    "0x000000000000000000000000c5109ce71943e393f3e62c6ef5c1c806306274820000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001200000000000000000000000003432b6a60d23ca0dfca7761b7ab56459d9c964d0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000002710ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2dd8ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff47a00000000000000000000000000000000000000000000000921068acf49044f6500000000000000000000000000000000000000000000000004df79b1a2dbe3af80000000000000000000000000000000000000000000000909a7c1bdda34e83350000000000000000000000000000000000000000000000004d300282e07c53fa";

  const decodedCallArgs = decodeUniswapV3LiquidityMintArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.UniswapV3LiquidityMint,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const nfts = await publicClient.readContract({
    abi: IUniswapV3LiquidityPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getNftIds",
  });

  const lastMinted = nfts[nfts.length - 1];

  if (!lastMinted) {
    throw new Error("No NFTs minted");
  }

  const pair = await publicClient.readContract({
    abi: IUniswapV3LiquidityPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getPairForNft",
    args: [lastMinted],
  });

  expect(pair).toStrictEqual([decodedCallArgs.token0, decodedCallArgs.token1]);
});

test("prepare external position trade for Uniswap V3 Liquidity add liquidity should work correctly", async () => {
  const comptrollerProxy = "0x62eeaaeb23a2e5da6e255bf5384b3acfa57a07b4" as const;
  const vaultOwner = "0x7402803f9a4a9afd316fbd40791ec6f53d9c5fed" as const;

  await testClient.reset({
    blockNumber: 16077487n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x98722818c453495b4496d1bf800f484b039031deffbf52247357b6b964b93378
  const callArgs =
    "0x00000000000000000000000065aeb5ad19fc3e860e6350708f5231d31c0a29e70000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000005c56c000000000000000000000000000000000000000000000c35a72f57a4ddc45ed20000000000000000000000000000000000000000000000000000000d7a2bd40a000000000000000000000000000000000000000000000c1665835953db8ca58d0000000000000000000000000000000000000000000000000000000d57ab63d6";

  const decodedCallArgs = decodeUniswapV3LiquidityAddLiquidityArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.UniswapV3LiquidityAddLiquidity,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const { result: managedAssets } = await publicClient.simulateContract({
    abi: IUniswapV3LiquidityPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getManagedAssets",
  });

  expect(managedAssets).toStrictEqual([
    [
      "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    ],
    [26552260047056598617912n, 17175348648285780684n, 398439479879480760281510n, 694526211635n],
  ]);
});

test("prepare external position trade for Uniswap V3 Liquidity remove liquidity should work correctly", async () => {
  const comptrollerProxy = "0xc65de17ec97eec0e184c94767517b6acf47b27aa" as const;
  const vaultOwner = "0x73c35a5b2b57cb21562de72ab5dd60443463f49b" as const;

  await testClient.reset({
    blockNumber: 17994384n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xfab34f9496888ce3b49e60ed8e6565da9449b6542ebdf5b61cf6d353b05fcf52
  const callArgs =
    "0x0000000000000000000000006b75126f533e1c1ec0d9695ac18835f60b6234f4000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000007bf59000000000000000000000000000000000000000000000197e46c33d1590f71c70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004636f4c53b7fc0e13a81";

  const decodedCallArgs = decodeUniswapV3LiquidityRemoveLiquidityArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.UniswapV3LiquidityRemoveLiquidity,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const { result: managedAssets } = await publicClient.simulateContract({
    abi: IUniswapV3LiquidityPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getManagedAssets",
  });

  expect(managedAssets).toStrictEqual([
    [
      "0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0",
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      "0xc944E90C64B2c07662A292be6244BDf05Cda44a7",
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "0xD533a949740bb3306d119CC777fa900bA034cd52",
      "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
      "0xbC396689893D065F41bc2C6EcbeE5e0085233447",
    ],
    [
      7942723337404234767450n,
      79915254234897654965n,
      0n,
      35409286n,
      13115251932762531221721n,
      251005461n,
      6772140957326165625007n,
      554040038492444778297n,
      0n,
      22843399568n,
      0n,
      17030174728786446986370n,
      11708818577182045356386n,
    ],
  ]);
});

test("prepare external position trade for Uniswap V3 Liquidity collect should work correctly", async () => {
  const comptrollerProxy = "0x62eeaaeb23a2e5da6e255bf5384b3acfa57a07b4" as const;
  const vaultOwner = "0x7402803f9a4a9afd316fbd40791ec6f53d9c5fed" as const;
  const vaultProxy = "0xac41aef84679f53c65aa7f39e0ea10c6f33459c0" as const;

  await testClient.reset({
    blockNumber: 16019847n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x90a7fad8f916a1a301259cde94d3d2065d3ef4469e3d8ba64e7b2ff142291a2a
  const callArgs =
    "0x00000000000000000000000065aeb5ad19fc3e860e6350708f5231d31c0a29e70000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000057ed5";

  const decodedCallArgs = decodeUniswapV3LiquidityCollectArgs(callArgs);

  const wethBalanceBeforeCollect = await testActions.getBalanceOf({
    token: WETH,
    account: vaultProxy,
  });

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.UniswapV3LiquidityCollect,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const wethBalanceAfterCollect = await testActions.getBalanceOf({
    token: WETH,
    account: vaultProxy,
  });

  expect(wethBalanceAfterCollect).toBeGreaterThan(wethBalanceBeforeCollect);
});

test("prepare external position trade for Uniswap V3 Liquidity purge should work correctly", async () => {
  const comptrollerProxy = "0x62eeaaeb23a2e5da6e255bf5384b3acfa57a07b4" as const;
  const vaultOwner = "0x7402803f9a4a9afd316fbd40791ec6f53d9c5fed" as const;

  await testClient.reset({
    blockNumber: 16077381n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x84304e395faf7de3e86b003faeea0ddd00b6955dba751110a7913b200890b901
  const callArgs =
    "0x00000000000000000000000065aeb5ad19fc3e860e6350708f5231d31c0a29e70000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000054bfc000000000000000000000000000000000000000000000002c28091dceae9eb5400000000000000000000000000000000000000000000911854a9d4623763dfc000000000000000000000000000000000000000000000000000000059edc48ad8";

  const decodedCallArgs = decodeUniswapV3LiquidityPurgeArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.UniswapV3LiquidityPurge,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const { result: managedAssets } = await publicClient.simulateContract({
    abi: IUniswapV3LiquidityPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getManagedAssets",
  });

  expect(managedAssets).toStrictEqual([
    ["0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"],
    [26614843808551483928873n, 17132279401328663476n],
  ]);
});
