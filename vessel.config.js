import { defineConfig } from 'vessel';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:10000'
    }
  }
});
