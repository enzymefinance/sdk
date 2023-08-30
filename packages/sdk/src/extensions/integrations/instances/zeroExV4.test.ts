import { INTEGRATION_MANAGER, WETH, ZERO_EX_V4_ADAPTER } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions, testClientMainnet } from "../../../../tests/globals.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { decodeZeroExV4TakeOrderArgs } from "./zeroExV4.js";
import { parseEther } from "viem";

import { test } from "vitest";

test("prepare adapter trade for zeroExV4 take order should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 17681935n,
  });

  const comptrollerProxy = "0x22ec6ca17e2d053f952fbfe203ae7af1e354cedd";
  const vaultOwner = "0x9376121C35Ef972b7Fc708eAbE9C8A080adcBcd8";
  const vaultProxy = "0x3a6ba289eefb1c038c088c50575d3ef30e33555d";

  await testClientMainnet.setBalance({
    value: parseEther("1"),
    address: vaultOwner,
  });

  // integrationData from tx 0x0a381611313923998cc3bee5e513a492ce270c7862af579b1e7c0511afc9734c
  const integrationData =
    "0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000003b9aca00000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000076d809d3772cfe7000000000000000000000000000000000000000000000000000000003b9aca00000000000000000000000000a69babef1ca67a37ffaf7a485dfff3382056e78c0000000000000000000000005966cbe0167d95ea03ffad0bd9091849a52dfbd50000000000000000000000009376121c35ef972b7fc708eabe9c8a080adcbcd800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064af711201ffffffffffffffffffffffffffffffffffffff25a0836b64af6fe6000000360000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000001b6255b0ff88258c89cf97ca7843b576288ee1c2ccc005af1887a85dc67cf5f1a1226e25ddfe41ad96496d15537b150192fd5705bf9044b31d5e96689389dd3bfd";

  const decodedIntegrationData = decodeZeroExV4TakeOrderArgs(integrationData);

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ZERO_EX_V4_ADAPTER,
      callArgs: {
        type: Integration.ZeroExV4TakeOrder,
        ...decodedIntegrationData,
      },
    }),
    clientNetwork: "mainnet",
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: 535225343455449063n,
  });
});
