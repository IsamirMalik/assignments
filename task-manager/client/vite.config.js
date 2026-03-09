import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://assignments-77xw.onrender.com",
        changeOrigin: true,
      },
    },
  },
});

