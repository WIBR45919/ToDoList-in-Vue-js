module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: { '1-': '-1'},
      translate: { '35' : '35%'}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
