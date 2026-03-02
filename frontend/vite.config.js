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
    host: true,
    port: 5173,
    allowedHosts: [
      'frontend-app',           // Имя сервиса в Docker
      'localhost',
      '127.0.0.1',
      '.138.124.74.71',         // Твой IP (с точкой в начале для всех subdomains)
      '.telecom.ru',            // Если есть домен
      'all'                      // РАЗРЕШИТЬ ВСЕ (для разработки)
    ],
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  }
})
