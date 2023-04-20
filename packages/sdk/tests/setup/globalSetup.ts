import { stopAnvilInstances, createAnvilProxy } from "./proxy.js";

export default async function () {
  const server = await createAnvilProxy();

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
