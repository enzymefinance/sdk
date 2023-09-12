import { publicClientMainnet } from "../../tests/globals.js";
import { convertCrvToCvxWithCvxMining } from "./convertCrvToCvxWithCvxMining.js";
import { expect, test } from "vitest";

test("convert crv to cvx with cvx mining should work correctly", async () => {
  const cvxMining = "0x3c75BFe6FbfDa3A94E7E7E8c2216AFc684dE5343" as const;
  const amount = 1000n as const;

  const result = await convertCrvToCvxWithCvxMining(publicClientMainnet, {
    cvxMining,
    amount,
  });

  expect(result).toBeTypeOf("bigint");
});
