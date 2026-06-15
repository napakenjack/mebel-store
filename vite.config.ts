import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'icon-192.svg',
        'icon-512.svg',
        'icons/favicon.png',
        'icons/app-icon-192.png',
        'icons/app-icon-512.png',
      ],
      manifest: {
        name: 'Amanat Mebel - ваш магазин мебели',
        short_name: 'Amanat Mebel',
        description: 'PWA-демо Amanat Mebel: онлайн-магазин мебели, кабинет клиента и CRM.',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icons/app-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons/app-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
