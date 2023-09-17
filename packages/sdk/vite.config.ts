/// <reference types="vitest" />

import aliases from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  envDir: "../../",
  plugins: [aliases()],
  test: {
    testTimeout: 200_000,
    globalSetup: ["./test/setup/global.ts"],
    include: ["./test/**/*.test.ts"],
    coverage: {
      reporter: process.env.CI ? ["lcov"] : ["text", "json", "html"],
      include: ["./src/**/*.ts"],
    },
  },
});
