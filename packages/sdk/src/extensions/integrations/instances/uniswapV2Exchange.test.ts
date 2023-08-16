import { DAI, WETH } from "../../../../tests/constants.js";
import { toWei } from "../../../utils/conversion.js";
import { decodeUniswapV2ExchangeTakeOrderArgs, encodeUniswapV2ExchangeTakeOrderArgs } from "./uniswapV2Exchange.js";
import { expect, test } from "vitest";

test("decodeUniswapV2ExchangeTakeOrderArgs should be equal to encoded data with encodeUniswapV2ExchangeTakeOrderArgs", () => {
  const params = {
    path: [WETH, DAI],
    outgoingAssetAmount: toWei(100),
    minIncomingAssetAmount: toWei(50),
  } as const;

  const encoded = encodeUniswapV2ExchangeTakeOrderArgs({
    ...params,
    path: [...params.path],
  });
  const decoded = decodeUniswapV2ExchangeTakeOrderArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeUniswapV2ExchangeTakeOrderArgs should encode correctly", () => {
  expect(
    encodeUniswapV2ExchangeTakeOrderArgs({
      path: [WETH, DAI],
      outgoingAssetAmount: toWei(100),
      minIncomingAssetAmount: toWei(50),
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f"',
  );
});

test("decodeUniswapV2ExchangeTakeOrderArgs should decode correctly", () => {
  expect(
    decodeUniswapV2ExchangeTakeOrderArgs(
      "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f",
    ),
  ).toEqual({
    path: [WETH, DAI],
    outgoingAssetAmount: toWei(100),
    minIncomingAssetAmount: toWei(50),
  });
});
