module.exports = {
  theme: {
    extend: {
      listStyleType: {
        square: 'square',
      },
      colors: {
        bg: '#121212',
        spotify: '#1ed760',
        navbg: '#040404',
        playerbg: '#282828',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    content: [
      `./components/**/*.{vue,js}`,
      `./layouts/**/*.vue`,
      `./pages/**/*.vue`,
      `./plugins/**/*.{js,ts}`,
      `./nuxt.config.{js,ts}`,
    ],
  },
}
