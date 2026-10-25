import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Vite blocks preview requests whose Host header is not in this list.
// Leave ALLOWED_HOSTS empty to accept the domain Coolify assigns.
// Set ALLOWED_HOSTS=host-a.example.com,host-b.example.com to restrict it.
function previewAllowedHosts() {
  const raw = process.env.ALLOWED_HOSTS
  if (!raw || raw.trim() === '' || raw.trim() === '*') {
    return true
  }
  return raw.split(',').map((host) => host.trim()).filter(Boolean)
}

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    host: '0.0.0.0',
    allowedHosts: previewAllowedHosts(),
  },
})

