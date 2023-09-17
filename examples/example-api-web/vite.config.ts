/// <reference types="vite" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import aliases from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), aliases()],
  build: {
    target: "esnext",
  },
});
