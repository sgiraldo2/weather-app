// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    // Keys within public are also exposed client-side
    public: {
      MAPTILER_API_KEY: process.env.NUXT_MAPTILER_API_KEY,
      WINDY_API_KEY: process.env.NUXT_WINDY_API_KEY,
    },
  },

  css: ['bootstrap/dist/css/bootstrap.css', 'bootstrap-icons/font/bootstrap-icons.css'],
  plugins: [
    { src: '~/plugins/vercel.js', mode: 'client' },
    { src: '~/plugins/bootstrap.js', mode: 'client' },
  ],
  devServer: {
    port: 3020,
  },
  modules: ['@nuxtjs/color-mode'],
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    // fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    dataValue: 'bs-theme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  nitro: {
    preset: 'vercel-edge',
  },
  devtools: { enabled: true },
});
