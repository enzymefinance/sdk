import { min } from "./math.js";
import { expect, test } from "vitest";

test("min should work correctly", () => {
  expect(min(5n, 4n, 2n)).toMatchInlineSnapshot("2n");
  expect(min(5n, -3n)).toMatchInlineSnapshot("-3n");
  expect(min(5n)).toMatchInlineSnapshot("5n");
});
