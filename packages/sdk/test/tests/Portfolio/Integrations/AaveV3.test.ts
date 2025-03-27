import { Portfolio } from "@enzymefinance/sdk";

import { test } from "vitest";

test("construct sweep tx", () => {
  const tx = Portfolio.Integrations.AaveV3.sweep({
    comptrollerProxy: "0x251d885bc93ba2120a8376da71a45189a228e3ef",
    externalPositionManager: "0x1e3da40f999cf47091f869ebac477d84b0827cf4",
    externalPositionProxy: "0x22a65f880bf67b6b62aa6cca4f28b6ee085ee6ba",
    callArgs: {
      assets: ["0x30d20208d987713f46dfd34ef128bb16c404d10f"],
    },
  });

  console.log(tx);
});
