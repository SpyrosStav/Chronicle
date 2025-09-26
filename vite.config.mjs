import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true, 
    proxy: {
      '/api': {
        target: 'http://192.168.1.203:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'static/js',      //  ➜ Flask static path
    emptyOutDir: true,
    rollupOptions: {
      input: {
        character: resolve(__dirname, 'src/entry/characterPage.jsx'),
        // campaigns: resolve(__dirname, 'src/entry/campaignsPage.jsx'),
      },

      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
        },
    },
  },
});