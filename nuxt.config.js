export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxify',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/gotham.css',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    // https://go.nuxtjs.dev/tailwindcss
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],
  toast: {
    position: 'top-center',
  },
  purgeCSS: {
    enabled: false,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  router: {
    router: {
      middleware: ['auth'],
    },
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      home: '/',
    },
    // Options
    strategies: {
      spotify: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.spotify.com/authorize',
          logout: 'https://nuxify.vercel.app/',
          userInfo: 'https://api.spotify.com/v1/me',
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: 'token',
        state: 'UNIQUE_AND_NON_GUESSABLE',
        clientId: process.env.CLIENT_ID,
        scope: [
          'user-read-private',
          'user-read-email',
          'user-read-playback-state',
          'user-modify-playback-state',
          'playlist-modify-public',
          'playlist-modify-private',
        ],
      },
    },
  },
}
