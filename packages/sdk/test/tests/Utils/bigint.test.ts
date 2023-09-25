import { BI } from "@enzymefinance/sdk/Utils";
import { expect, test } from "vitest";

test("min should work correctly", () => {
  expect(BI.min(5n, 4n, 2n)).toMatchInlineSnapshot("2n");
  expect(BI.min(5n, -3n)).toMatchInlineSnapshot("-3n");
  expect(BI.min(5n)).toMatchInlineSnapshot("5n");
});

test("max should work correctly", () => {
  expect(BI.max(5n, 4n, 2n)).toMatchInlineSnapshot("5n");
  expect(BI.max(5n, -3n)).toMatchInlineSnapshot("5n");
  expect(BI.max(5n)).toMatchInlineSnapshot("5n");
});
