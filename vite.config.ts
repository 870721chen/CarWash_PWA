import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const base = process.env.GITHUB_PAGES === 'true' ? '/CarWash_PWA/' : '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      base,
      scope: base,
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'CarWash 洗車管理',
        short_name: 'CarWash',
        description: '洗車紀錄、客戶車輛與定期維護管理',
        theme_color: '#f5f6f8',
        background_color: '#f5f6f8',
        display: 'standalone',
        orientation: 'any',
        start_url: base,
        scope: base,
        icons: [
          { src: `${base}pwa-192.svg`, sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: `${base}pwa-512.svg`, sizes: '512x512', type: 'image/svg+xml', purpose: 'any' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}']
      }
    })
  ]
});
