import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

//sourcemap: true allows React Dev tools to view files
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/dist',
    emptyOutDir: true,
    sourcemap: true,
  }
})
