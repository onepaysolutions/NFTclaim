import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })],
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "./src"),
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
    define: {
      'process.env': env
    }
  };
});
