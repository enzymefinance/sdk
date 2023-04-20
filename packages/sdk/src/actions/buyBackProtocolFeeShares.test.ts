import { expect, test } from "vitest";
import { toWei } from "../utils/conversion.js";
import { encodeFunctionData } from "viem";
import {
  decodeBuyBackProtocolFeeSharesParams,
  prepareBuyBackProtocolFeeSharesParams,
} from "./buyBackProtocolFeeShares.js";

test("decode buy back protocol fee shares should work correctly", () => {
  const params = {
    sharesAmount: toWei(100),
  };
  const prepared = prepareBuyBackProtocolFeeSharesParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeBuyBackProtocolFeeSharesParams(encoded);

  expect(decoded).toEqual(params);
});
