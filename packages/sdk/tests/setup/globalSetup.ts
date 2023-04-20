import { portNumbers } from "get-port";
import { stopAnvilInstances, createAnvilProxy } from "./proxy.js";
import { FORK_BLOCK_NUMBER, FORK_URL } from "../constants.js";

export default async function () {
  const server = await createAnvilProxy({
    proxyPort: 8545,
    proxyHostname: "::",
    anvilOptions: {
      portRange: portNumbers(8546, 8645),
      forkBlockNumber: FORK_BLOCK_NUMBER,
      forkUrl: FORK_URL,
    },
  });

  return async () => {
    // Clean up all anvil instances and the anvil pool manager itself.
    await Promise.allSettled([
      stopAnvilInstances(),
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
    ]);
  };
}
