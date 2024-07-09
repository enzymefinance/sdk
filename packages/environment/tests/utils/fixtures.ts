import { getEnvironmentForRelease } from "../../src/deployments/all.js";
import { isRelease } from "../../src/index.js";

if (!isRelease(process.env.RELEASE)) {
  throw new Error(`Invalid release ${process.env.RELEASE}`);
}

export const environment = getEnvironmentForRelease(process.env.RELEASE);
