import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'static/js',      //  ➜ Flask static path
    emptyOutDir: true,
    rollupOptions: {
      // 🅰️  MULTI‑ENTRY  (σβήστο αν θες SPA)
      input: {
        character: resolve(__dirname, 'src/entry/characterPage.jsx'),
        // campaigns: resolve(__dirname, 'src/entry/campaignsPage.jsx'),
      },

      output: {
        // Τα ονόματα των αρχείων χωρίς hash:
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
        }
      // αν θες SPA:
      // input: resolve(__dirname, 'src/main.jsx'),
    },
  },
});