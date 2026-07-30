import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://location-cars-production-c0c9.up.railway.app/',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://location-cars-production-c0c9.up.railway.app/',
        changeOrigin: true,
      }
    }
  }
})
