import { startProxy } from "@viem/anvil";

export default async function () {
  return await startProxy({
    options: (_, request) => {
      const forkUrl = request.headers["x-anvil-fork-url"];
      const forkChainId = request.headers["x-anvil-fork-chain"];
      const forkBlockNumber = request.headers["x-anvil-fork-block"];

      if (!(typeof forkChainId === "string" && forkChainId !== "")) {
        throw new Error("Invalid `x-anvil-fork-chain` header");
      }

      if (!(typeof forkBlockNumber === "string" && forkBlockNumber !== "")) {
        throw new Error("Invalid `x-anvil-fork-block` header");
      }

      if (!(typeof forkUrl === "string" && forkUrl !== "")) {
        throw new Error("Invalid `x-anvil-fork-url` header");
      }

      return {
        forkUrl,
        forkChainId: Number(forkChainId),
        forkBlockNumber: BigInt(forkBlockNumber),
        noRateLimit: true,
      };
    },
  });
}
