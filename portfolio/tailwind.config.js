/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-orange' : '#ff7e5f',
        'peach' : '#feb47b',

      },
    },
  },
  plugins: [],
}
