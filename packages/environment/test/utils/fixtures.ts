import { getEnvironmentForRelease } from "../../src/deployments/all.js";
import { isRelease } from "../../src/index.js";

if (!isRelease(process.env.VITE_RELEASE)) {
  throw new Error(`Invalid release ${process.env.VITE_RELEASE}`);
}

export const environment = getEnvironmentForRelease(process.env.VITE_RELEASE);
