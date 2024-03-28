import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    files: ["src/**/*.test.ts", "src/**/*.test.tsx"], // Define the files to be included in testing,
  },
});
