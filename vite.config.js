import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
    open: false,
    host: true
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    // ribbon3d (Three.js) is a lazy chunk of ~530 kB; it never blocks first paint
    chunkSizeWarningLimit: 600
  }
});
