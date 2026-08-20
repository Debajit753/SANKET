import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // './' keeps asset URLs relative so the same build works on Vercel (root)
  // and on GitHub Pages (served from /<repo>/) with no extra config.
  base: "./",
  plugins: [react(), tailwindcss()],
});
