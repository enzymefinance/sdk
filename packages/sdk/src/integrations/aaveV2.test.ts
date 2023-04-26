import { test, expect } from "vitest";

import { getAddress } from "viem";
import { AAVE_V2_ADAPTER, A_WETH, INTEGRATION_MANAGER } from "../../tests/constants.js";
import { toWei } from "../utils/conversion.js";
import {
  decodeCallArgsForAaveV2Lend,
  decodeIntegrationDataForAaveV2Lend,
  encodeCallArgsForAaveV2Lend,
  encodeIntegrationDataForAaveV2Lend,
  prepareCallOnAaveV2LendParams,
  prepareCallOnAaveV2RedeemParams,
} from "./aaveV2.js";

test("encodeIntegrationDataForAaveV2Lend should encode correctly", () => {
  expect(
    encodeIntegrationDataForAaveV2Lend({
      aToken: A_WETH,
      depositAmount: toWei(100),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000"',
  );
});

test("decodeIntegrationDataForAaveV2Lend should decode correctly", () => {
  expect(
    decodeIntegrationDataForAaveV2Lend(
      "0x000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000",
    ),
  ).toMatchInlineSnapshot(
    {
      aToken: A_WETH,
      depositAmount: toWei(100),
    },
    `
    {
      "aToken": "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e",
      "depositAmount": 100000000000000000000n,
    }
  `,
  );
});

test("decodeIntegrationDataForAaveV2Lend should be equal to encoded data with encodeIntegrationDataForAaveV2Lend", () => {
  const params = {
    aToken: getAddress(A_WETH),
    depositAmount: toWei(100),
  };
  const encoded = encodeIntegrationDataForAaveV2Lend(params);
  const decoded = decodeIntegrationDataForAaveV2Lend(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCallArgsForAaveV2Lend should encode correctly", () => {
  expect(
    encodeCallArgsForAaveV2Lend({
      adapter: AAVE_V2_ADAPTER,
      aToken: A_WETH,
      depositAmount: toWei(100),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000ece6b376af7c9273cebaf6528565c47ea2cb8a4c099f75150000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000"',
  );
});

test("decodeCallArgsForAaveV2Lend should decode correctly", () => {
  expect(
    decodeCallArgsForAaveV2Lend(
      "0x000000000000000000000000ece6b376af7c9273cebaf6528565c47ea2cb8a4c099f75150000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000",
    ),
  ).toEqual({
    aToken: A_WETH,
    adapter: AAVE_V2_ADAPTER,
    depositAmount: toWei(100),
  });
});

test("decodeCallArgsForAaveV2Lend should be equal to encoded data with encodeCallArgsForAaveV2Lend", () => {
  const params = {
    adapter: getAddress(AAVE_V2_ADAPTER),
    aToken: getAddress(A_WETH),
    depositAmount: toWei(100),
  };
  const encoded = encodeCallArgsForAaveV2Lend(params);
  const decoded = decodeCallArgsForAaveV2Lend(encoded);

  expect(decoded).toEqual(params);
});

test("prepareCallOnAaveV2LendParams should properly prepare params", () => {
  const callArgs = {
    adapter: getAddress(AAVE_V2_ADAPTER),
    aToken: getAddress(A_WETH),
    depositAmount: toWei(100),
  };

  expect(prepareCallOnAaveV2LendParams({ integrationManager: INTEGRATION_MANAGER, callArgs })).toMatchInlineSnapshot(
    `
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_extension",
              "type": "address",
            },
            {
              "internalType": "uint256",
              "name": "_actionId",
              "type": "uint256",
            },
            {
              "internalType": "bytes",
              "name": "_callArgs",
              "type": "bytes",
            },
          ],
          "name": "callOnExtension",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0x31329024f1a3E4a4B3336E0b1DfA74CC3FEc633e",
        0n,
        "0x000000000000000000000000ece6b376af7c9273cebaf6528565c47ea2cb8a4c099f75150000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});

test("prepareCallOnAaveV2RedeemParams should properly prepare params", () => {
  const callArgs = {
    adapter: getAddress(AAVE_V2_ADAPTER),
    aToken: getAddress(A_WETH),
    redeemAmount: toWei(100),
  };

  expect(prepareCallOnAaveV2RedeemParams({ integrationManager: INTEGRATION_MANAGER, callArgs })).toMatchInlineSnapshot(
    `
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_extension",
              "type": "address",
            },
            {
              "internalType": "uint256",
              "name": "_actionId",
              "type": "uint256",
            },
            {
              "internalType": "bytes",
              "name": "_callArgs",
              "type": "bytes",
            },
          ],
          "name": "callOnExtension",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0x31329024f1a3E4a4B3336E0b1DfA74CC3FEc633e",
        0n,
        "0x000000000000000000000000ece6b376af7c9273cebaf6528565c47ea2cb8a4cc29fa9dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
