import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import prerender from './scripts/vite/prerender.js';

export default defineConfig({
  plugins: [prerender()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        privacidade: fileURLToPath(new URL('./politica-de-privacidade.html', import.meta.url)),
      },
    },
  },
  server: {
    open: true,
  },
});
