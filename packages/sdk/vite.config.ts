import { defineConfig } from "vitest/config";
import aliases from "vite-tsconfig-paths";

export default defineConfig({
  envDir: "../../",
  // NOTE: We only use the path aliases for local development.
  plugins: [process.env.CI ? undefined : aliases()],
  test: {
    testTimeout: 50000,
    globalSetup: ["./tests/setup/globalSetup.ts"],
    setupFiles: ["./tests/setup/setup.ts"],
    coverage: {
      reporter: process.env.CI ? ["lcov"] : ["text", "json", "html"],
      exclude: ["**/dist/**", "**/tests/**", "**/*.test.ts"],
    },
  },
});
