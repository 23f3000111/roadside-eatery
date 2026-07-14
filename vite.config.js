import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages project path so assets resolve on
// https://<user>.github.io/roadside-eatery/ . Locally `npm run dev` serves
// under the same path.
export default defineConfig({
  base: '/roadside-eatery/',
  plugins: [react()],
})
