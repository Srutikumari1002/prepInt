import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Change '/prepInt/' to '/<your-new-repository-name>/' for GitHub Pages to work
  base: '/prepInt/',
  plugins: [react()],
})
