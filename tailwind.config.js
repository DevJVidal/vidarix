/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B0F1A',
        accent: '#1DA1F2'
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'], // Definindo a fonte Anton
      }
    }
  },
  plugins: []
}
