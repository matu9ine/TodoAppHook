import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      // Псевдоним для путей, упрощает импорт модулей
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    eslintPlugin(),
    react(),
  ],
});
