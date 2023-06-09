import { defineConfig } from "vitest/config";

export default defineConfig({
  envDir: "../../",
  test: {
    testTimeout: 30000,
    // TODO: Cheeky... Let's remove this asap, heh.
    passWithNoTests: true,
    coverage: {
      reporter: process.env.CI ? ["lcov"] : ["text", "json", "html"],
      exclude: ["**/dist/**", "**/test/**", "**/*.test.ts"],
    },
  },
});
