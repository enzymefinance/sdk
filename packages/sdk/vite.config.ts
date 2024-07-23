import * as path from "node:path";
import aliases from "vite-tsconfig-paths";
import { defineProject } from "vitest/config";

export default defineProject({
  envDir: "../../",
  plugins: [aliases({ projects: ["./tsconfig.json"] })],
  test: {
    include: ["test/**/*.test.ts"],
    testTimeout: 200_000,
    globalSetup: [path.join(__dirname, "test/setup/global.ts")],
  },
});
