import { defineConfig } from "vitest/config";
import aliases from "vite-tsconfig-paths";

export default defineConfig({
  envDir: "../../",
  // NOTE: We only use the path aliases for local development.
  plugins: [process.env.CI ? undefined : aliases()],
  test: {
    testTimeout: 30000,
  },
});
