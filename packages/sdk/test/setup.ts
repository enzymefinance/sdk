export * as TestActions from "./environment/actions.js";
import { setupMainnet } from "./environment/mainnet.js";
import { setupPolygon } from "./environment/polygon.js";

export type { TestEnvironment } from "./environment/anvil.js";

export const TestSetup = {
  mainnet: setupMainnet,
  polygon: setupPolygon,
};
