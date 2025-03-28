import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import VitePluginSitemap from 'vite-plugin-sitemap';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'USSD Emulator',
        short_name: 'USSD Emulator',
        description: 'Test your USSD services without a real phone',
        theme_color: '#3b82f6',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    }),
    VitePluginSitemap({
      hostname: 'https://jamesnjovu.github.io/ussd-emulator/',
      exclude: ['404'],
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
  base: '/ussd-emulator/', // Important for GitHub Pages
  
  // Add meta tags for SEO
  server: {
    open: true,
  },
  
  // Optimize build
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-helmet-async'],
          ui: ['tailwindcss'],
        },
      },
    },
  }
});