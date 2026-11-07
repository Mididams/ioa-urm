import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: "./",
  define: command === "build" ? { "process.env.NODE_ENV": '"production"' } : {},
  plugins: [{
    name: "ioa-development-entry",
    apply: "serve",
    transformIndexHtml(html) {
      return html.replace(
        '<script defer src="./app.js"></script>',
        '<script type="module" src="./main.tsx"></script>',
      );
    },
  }],
  build: {
    lib: {
      entry: "main.tsx",
      name: "IoaUrm",
      formats: ["iife"],
      fileName: () => "app.js",
    },
  },
}));
