/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        secondary: '#A8D5BA',
        background: '#f0f2f5',
        textColor: '#333',
        danger: 'red',
      },
    },
  },
  plugins: [],
}
