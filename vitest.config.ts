/// <reference types="vitest" />
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    // Specify the directory where your test files are located
    dir: "src",

    // Optionally, you can configure reporters for test results
    reporters: ["default"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      enabled: true,
    },
    // Optionally, you can configure test environment setup
    // setupFiles: ["<rootDir>/setupTests.ts"],
    include: ["**/*.spec.ts"],
    setupFiles: ["/setupTests.ts"],
  },
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [tsconfigPaths()],
  base: "/",
});
