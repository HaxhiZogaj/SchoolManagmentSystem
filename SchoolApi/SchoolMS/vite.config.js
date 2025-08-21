import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
 server: {
  host: true,
  strictPort: true,
  allowedHosts: [
    'localhost',
    '192.168.1.2',
    '753f6e59d6d8.ngrok-free.app'
  ],
},

})
