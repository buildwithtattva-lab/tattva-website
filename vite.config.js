import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_GALLERY_TAG'],
  server: {
    port: 5173,
    open: true
  }
})
