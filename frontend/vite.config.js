import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'frontend-app',
      'localhost',
      '127.0.0.1',
      '.138.124.74.71',
      '.wishlistprice.ru',
      '.telecom.ru',
      'all'
    ],
    cors: {
      origin: true,  // Изменено с '*' на true для лучшей совместимости
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173
    },
    watch: {
      usePolling: true,
      interval: 1000
    },
    strictPort: true,
    force: true
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['all'],
    cors: true
  }
})