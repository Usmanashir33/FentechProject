import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tilwindcss from 'vite-plugin-tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react();
    tilwindcss(),

  ],
})
