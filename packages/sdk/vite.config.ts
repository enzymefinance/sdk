import aliases from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  envDir: "../../",
  plugins: [aliases()],
  test: {
    testTimeout: 200_000,
    globalSetup: ["./tests/setup/globalSetup.ts"],
    setupFiles: ["./tests/setup/setup.ts"],
    coverage: {
      reporter: process.env.CI ? ["lcov"] : ["text", "json", "html"],
      exclude: ["**/dist/**", "**/tests/**", "**/*.test.ts"],
    },
  },
});
