import { defineWorkspace } from "vitest/config";
import type { ProjectConfig } from "vitest/node";

const baseConfig: Partial<ProjectConfig> = {
  globals: false,
  restoreMocks: true,
};

export default defineWorkspace([
  {
    extends: "vite.config.ts",
    test: {
      ...baseConfig,
      name: "browser",
      include: ["src/**/*.browser.test.{ts,tsx}"],
      browser: {
        enabled: true,
        name: "chromium",
        provider: "playwright",
        // https://playwright.dev
        providerOptions: {},
        headless: true,
      },
      setupFiles: ["./src/testing/setup.browser.ts"],
    },
  },
]);
