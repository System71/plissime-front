import { defineConfig } from "vite";

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  resolve: {
    alias: {
      // Si une dépendance essaie d'importer fsevents sous Linux
      fsevents: "/dev/null",
    },
  },
});
