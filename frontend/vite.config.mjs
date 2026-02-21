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
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        characterCreation: resolve(__dirname, 'src/entry/characterCreationPage.jsx'),
        characterList: resolve(__dirname, 'src/entry/characterListPage.jsx'),
        characterSheet: resolve(__dirname, 'src/entry/characterSheetPage.jsx'),
      },

      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      },
    },
  },
});