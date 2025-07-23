import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  $production: {
    nitro: {
      storage: {
        data: { driver: 'vercelBlob' },
      },
    },
  },
  $development: {
    nitro: {
      storage: {
        data: { driver: 'fs', base: './data' },
      },
    },
  },
})
