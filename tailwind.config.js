/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}",
    require('flowbite/plugin'),
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

