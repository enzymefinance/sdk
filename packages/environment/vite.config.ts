import aliases from "vite-tsconfig-paths";
import { defineProject } from "vitest/config";

export default defineProject({
  envDir: "./",
  plugins: [aliases({ projects: ["./tsconfig.json"] })],
  test: {
    include: ["test/**/*.test.ts"],
    testTimeout: 200_000,
  },
});
