import { setupMainnet } from "./environment/mainnet.js";
import { setupPolygon } from "./environment/polygon.js";

export const TestEnvironment = {
  setupMainnet,
  setupPolygon,
} as const;
