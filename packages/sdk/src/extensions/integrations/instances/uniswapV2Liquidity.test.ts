import { USDC, WETH } from "../../../../tests/constants.js";
import { toWei } from "../../../utils/conversion.js";
import {
  decodeUniswapV2LiquidityLendArgs,
  decodeUniswapV2LiquidityRedeemArgs,
  encodeUniswapV2LiquidityLendArgs,
  encodeUniswapV2LiquidityRedeemArgs,
} from "./uniswapV2Liquidity.js";
import { expect, test } from "vitest";

test("decodeUniswapV2LiquidityLendArgs should be equal to encoded data with encodeUniswapV2LiquidityLendArgs", () => {
  const params = {
    outgoingAssets: [WETH, USDC],
    maxOutgoingAssetAmounts: [toWei(100), toWei(150)],
    minOutgoingAssetAmounts: [toWei(50), toWei(100)],
    minIncomingAssetAmount: toWei(100),
  } as const;

  const encoded = encodeUniswapV2LiquidityLendArgs({
    ...params,
    outgoingAssets: [...params.outgoingAssets],
    maxOutgoingAssetAmounts: [...params.maxOutgoingAssetAmounts],
    minOutgoingAssetAmounts: [...params.minOutgoingAssetAmounts],
  });
  const decoded = decodeUniswapV2LiquidityLendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeUniswapV2LiquidityLendArgs should encode correctly", () => {
  expect(
    encodeUniswapV2LiquidityLendArgs({
      outgoingAssets: [WETH, USDC],
      maxOutgoingAssetAmounts: [toWei(100), toWei(150)],
      minOutgoingAssetAmounts: [toWei(50), toWei(100)],
      minIncomingAssetAmount: toWei(100),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000056bc75e2d63100000"',
  );
});

test("decodeUniswapV2LiquidityLendArgs should decode correctly", () => {
  expect(
    decodeUniswapV2LiquidityLendArgs(
      "0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000056bc75e2d63100000",
    ),
  ).toEqual({
    outgoingAssets: [WETH, USDC],
    maxOutgoingAssetAmounts: [toWei(100), toWei(150)],
    minOutgoingAssetAmounts: [toWei(50), toWei(100)],
    minIncomingAssetAmount: toWei(100),
  });
});

test("decodeUniswapV2LiquidityRedeemArgs should be equal to encoded data with encodeUniswapV2LiquidityRedeemArgs", () => {
  const params = {
    outgoingAssetAmount: toWei(100),
    incomingAssets: [WETH, USDC],
    minIncomingAssetAmounts: [toWei(100), toWei(150)],
  } as const;

  const encoded = encodeUniswapV2LiquidityRedeemArgs({
    ...params,
    incomingAssets: [...params.incomingAssets],
    minIncomingAssetAmounts: [...params.minIncomingAssetAmounts],
  });
  const decoded = decodeUniswapV2LiquidityRedeemArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeUniswapV2LiquidityRedeemArgs should encode correctly", () => {
  expect(
    encodeUniswapV2LiquidityRedeemArgs({
      outgoingAssetAmount: toWei(100),
      incomingAssets: [WETH, USDC],
      minIncomingAssetAmounts: [toWei(100), toWei(150)],
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000"',
  );
});

test("decodeUniswapV2LiquidityRedeemArgs should decode correctly", () => {
  expect(
    decodeUniswapV2LiquidityRedeemArgs(
      "0x0000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000",
    ),
  ).toEqual({
    outgoingAssetAmount: toWei(100),
    incomingAssets: [WETH, USDC],
    minIncomingAssetAmounts: [toWei(100), toWei(150)],
  });
});