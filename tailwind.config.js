/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "envited": {
          400: '#240D57',
          300: '#501FC1',
          200: '#8456EC',
          100: '#E87BF8'
        },
        "envited-purple": {
          300: '#CCB6FF',
          200: '#EDE5FF',
          100: '#F6F2FF'
        }
      }
    },
  },
  plugins: [],
}
