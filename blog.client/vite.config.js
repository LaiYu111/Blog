import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: "0.0.0.0"
  },

  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, 'src')
    }
  }
})
