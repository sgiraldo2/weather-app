// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
