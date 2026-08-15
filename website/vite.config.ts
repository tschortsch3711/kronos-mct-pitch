import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site under /<repo-name>/
export default defineConfig({
  plugins: [react()],
  base: '/kronos-mct-pitch/',
})
