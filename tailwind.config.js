/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        100: '31.25rem'
      },
      // let's define our colors here
      colors: {
        'primary-gray': '#F2F2F2'
      },
      fontFamily: {
      //let's add our fonts here
      sans: ['var(--font-montserrat)']
      },
    },
  },
  plugins: [],
}
