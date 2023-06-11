import react from "@vitejs/plugin-react";
import million from "million/compiler";
import * as path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [million.vite({ optimize: true }), react()],
});
