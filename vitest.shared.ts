import * as path from "node:path";
import type { UserConfig } from "vitest/config";

const alias = (pkg: string) => {
  const name = `@enzymefinance/${pkg}`;
  const target = process.env.TEST_DIST !== undefined ? "dist/dist/esm" : "src";
  return {
    [`${name}/test`]: path.join(__dirname, "packages", pkg, "test", "setup.js"),
    [`${name}`]: path.join(__dirname, "packages", pkg, target),
  };
};

// This is a workaround, see https://github.com/vitest-dev/vitest/issues/4744
const config: UserConfig = {
  esbuild: {
    target: "es2020",
  },
  test: {
    testTimeout: 200_000,
    include: ["test/**/*.test.ts"],
    alias: {
      ...alias("abis"),
      ...alias("api"),
      ...alias("environment"),
      ...alias("sdk"),
    },
  },
};

export default config;
