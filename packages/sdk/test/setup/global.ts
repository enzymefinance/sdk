import { startProxy } from "@viem/anvil";

export default async function () {
  return await startProxy({
    options: (_, request) => {
      const forkBlockNumber = request.headers["x-anvil-fork-block"];
      const forkUrl = request.headers["x-anvil-fork-url"];

      if (typeof forkBlockNumber !== "string") {
        throw new Error("Invalid `x-anvil-fork-block` header");
      }

      if (typeof forkUrl !== "string") {
        throw new Error("Invalid `x-anvil-fork-block` header");
      }

      return {
        forkUrl,
        forkBlockNumber: BigInt(forkBlockNumber),
      };
    },
  });
}
