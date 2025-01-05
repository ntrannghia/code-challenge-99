import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `main.js`
      }
    }
  }
})