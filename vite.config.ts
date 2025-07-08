import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    proxy: {
      "/w/api.php": {
        target: "https://en.wikipedia.org",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
