import { testClient } from "../client.js";

export async function increaseTimeAndMine({ seconds, blocks }: { seconds: number; blocks: number }) {
  switch (true) {
    case seconds === 0 && blocks === 0:
      return;
    case seconds === 0 && blocks > 0:
      return await testClient.mine({ blocks });
    case seconds > 0 && blocks === 0:
      return await testClient.increaseTime({ seconds });
    case seconds > 0 && blocks > 0:
      return await testClient.increaseTime({ seconds }).then(async () => {
        await testClient.mine({ blocks });
      });
  }
}
