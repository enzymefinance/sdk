import * as path from "node:path";
import { type UserConfigExport, mergeConfig } from "vitest/config";
import shared from "../../vitest.shared.js";

const config: UserConfigExport = {
  test: {
    globalSetup: [path.join(__dirname, "test/setup/global.ts")],
  },
};

export default mergeConfig(shared, config);
