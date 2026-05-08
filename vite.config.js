import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('firebase')) return 'firebase';
          if (id.includes('framer-motion') || id.includes('motion-utils') || id.includes('motion-dom')) {
            return 'motion';
          }
          if (id.includes('gsap') || id.includes('@gsap')) return 'gsap';
          if (id.includes('react-router')) return 'router';
          if (id.includes('@emailjs')) return 'emailjs';
          if (id.includes('react') || id.includes('scheduler')) return 'react';
          return 'vendor';
        },
      },
    },
  },
})
