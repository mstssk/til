import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    browser: {
      enabled: true,
      provider: "playwright",
      headless: true,
      // https://vitest.dev/guide/browser/playwright
      instances: [{ browser: "chromium" }],
    },
  },
});
