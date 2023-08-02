import { AAVE_V3_ADAPTER } from "../../../../tests/constants.js";
import { LEND_SELECTOR, REDEEM_SELECTOR } from "../../../constants/selectors.js";
import { decodeCallOnIntegrationArgs, encodeCallOnIntegrationArgs } from "./callOnIntegration.js";
import { type Hex, getAddress, toHex } from "viem";
import { expect, test } from "vitest";

test("encodeCallOnIntegrationArgs for Aave V3 lend should encode correctly", () => {
  expect(
    encodeCallOnIntegrationArgs({
      adapter: AAVE_V3_ADAPTER,
      selector: LEND_SELECTOR,
      integrationData: "0x1230",
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000009cfb64d91ce4eb821ff8edc1c2fda2e89e256707099f751500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000021230000000000000000000000000000000000000000000000000000000000000"',
  );
});

test("decodeCallOnIntegrationArgs for Aave V3 lend should decode correctly", () => {
  expect(
    decodeCallOnIntegrationArgs(
      "0x0000000000000000000000009cfb64d91ce4eb821ff8edc1c2fda2e89e256707099f751500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000021230000000000000000000000000000000000000000000000000000000000000",
    ),
  ).toMatchInlineSnapshot(
    {
      adapter: AAVE_V3_ADAPTER,
      selector: LEND_SELECTOR,
      integrationData: "0x1230",
    },
    `
    {
      "adapter": "0x9cfb64D91Ce4eB821fF8EdC1C2fdA2E89E256707",
      "integrationData": "0x1230",
      "selector": "0x099f7515",
    }
  `,
  );
});

test("decodeCallOnIntegrationArgs for Aave V3 lend should be equal to encoded data with encodeCallOnIntegrationArgs", () => {
  const params = {
    adapter: getAddress(AAVE_V3_ADAPTER),
    selector: LEND_SELECTOR as Hex,
    integrationData: toHex(
      "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000fedc73464dfd156d30f6524654a5d56e766da0c3000000000000000000000000faf2c3db614e9d38fe05edc634848be7ff0542b90000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003e8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000033b2e3cce25d9e52486e3880000000000000000000000000000000000000000000000000000000000000000",
    ),
  };
  const encoded = encodeCallOnIntegrationArgs(params);
  const decoded = decodeCallOnIntegrationArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCallOnIntegrationArgs for Aave V3 redeem should encode correctly", () => {
  expect(
    encodeCallOnIntegrationArgs({
      adapter: AAVE_V3_ADAPTER,
      selector: REDEEM_SELECTOR,
      integrationData: "0x1230",
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000009cfb64d91ce4eb821ff8edc1c2fda2e89e256707c29fa9dd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000021230000000000000000000000000000000000000000000000000000000000000"',
  );
});

test("decodeCallOnIntegrationArgs for Aave V3 redeem should decode correctly", () => {
  expect(
    decodeCallOnIntegrationArgs(
      "0x0000000000000000000000009cfb64d91ce4eb821ff8edc1c2fda2e89e256707c29fa9dd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000021230000000000000000000000000000000000000000000000000000000000000",
    ),
  ).toMatchInlineSnapshot(
    {
      adapter: AAVE_V3_ADAPTER,
      selector: REDEEM_SELECTOR,
      integrationData: "0x1230",
    },
    `
    {
      "adapter": "0x9cfb64D91Ce4eB821fF8EdC1C2fdA2E89E256707",
      "integrationData": "0x1230",
      "selector": "0xc29fa9dd",
    }
  `,
  );
});

test("decodeCallOnIntegrationArgs for Aave V3 redeem should be equal to encoded data with encodeCallOnIntegrationArgs", () => {
  const params = {
    adapter: getAddress(AAVE_V3_ADAPTER),
    selector: REDEEM_SELECTOR as Hex,
    integrationData: toHex(
      "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000fedc73464dfd156d30f6524654a5d56e766da0c3000000000000000000000000faf2c3db614e9d38fe05edc634848be7ff0542b90000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003e8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000033b2e3cce25d9e52486e3880000000000000000000000000000000000000000000000000000000000000000",
    ),
  };
  const encoded = encodeCallOnIntegrationArgs(params);
  const decoded = decodeCallOnIntegrationArgs(encoded);

  expect(decoded).toEqual(params);
});