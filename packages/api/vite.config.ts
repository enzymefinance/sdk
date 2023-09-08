/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  envDir: "../../",
  test: {
    testTimeout: 30000,
    // TODO: Cheeky... Let's remove this asap, heh.
    passWithNoTests: true,
    include: ["./test/**/*.test.ts"],
    coverage: {
      reporter: process.env.CI ? ["lcov"] : ["text", "json", "html"],
      include: ["./src/**/*.ts"],
    },
  },
});
