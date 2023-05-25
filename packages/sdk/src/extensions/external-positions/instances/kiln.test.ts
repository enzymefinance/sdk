import { decodeKilnStakeArgs, encodeKilnStakeArgs } from "./kiln.js";
import { getAddress } from "viem";
import { expect, test } from "vitest";

test("decodeKilnStakeArgs should work correctly", () => {
  const decoded = decodeKilnStakeArgs(
    "0x000000000000000000000000976ea74026e726554db657fa54763abd0c3a0aa9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000faf2c3db614e9d38fe05edc634848be7ff0542b90000000000000000000000000000000000000000000000000000000000000004",
  );

  expect(decoded).toMatchInlineSnapshot(`
    {
      "externalPositionProxy": "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
      "stakingContract": "0xFaF2c3DB614E9d38fE05EDc634848BE7Ff0542B9",
      "validatorAmount": 4n,
    }
  `);
});

test("encodeKilnStakeArgs should work correctly", () => {
  const params = {
    validatorAmount: 4n,
    stakingContract: getAddress("0xfaf2c3db614e9d38fe05edc634848be7ff0542b9"),
    externalPositionProxy: getAddress("0x976EA74026E726554dB657fA54763abd0C3a0aa9"),
  };
  const encoded = encodeKilnStakeArgs(params);

  expect(encoded).toMatchInlineSnapshot(
    '"0x000000000000000000000000976ea74026e726554db657fa54763abd0c3a0aa9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000faf2c3db614e9d38fe05edc634848be7ff0542b90000000000000000000000000000000000000000000000000000000000000004"',
  );
});

test("decode should be equal to encoded", () => {
  const params = {
    validatorAmount: 4n,
    stakingContract: getAddress("0xfaf2c3db614e9d38fe05edc634848be7ff0542b9"),
    externalPositionProxy: getAddress("0x976EA74026E726554dB657fA54763abd0C3a0aa9"),
  };
  const encoded = encodeKilnStakeArgs(params);
  const decoded = decodeKilnStakeArgs(encoded);

  expect(decoded).toEqual(params);
});
