// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },

  css: [
    './app/assets/styles.css'
  ],

  app: {
    baseURL: '/'
  },

  vite: {
    optimizeDeps: {
      exclude: ['html2pdf.js']
    }
  }
})