import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { version } from "./package.json";
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["recharts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
});
