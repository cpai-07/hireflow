import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API calls to Flask so we avoid CORS issues in dev
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
