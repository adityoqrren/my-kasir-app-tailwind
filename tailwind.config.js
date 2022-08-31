/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'tiny': '0.50rem'
      },
      keyframes: {
        slideDown : {
          '0%' : {
            top: '-40rem',
            opacity: '0'
          },
          '100%' : {
            top: '0',
            opacity: '1'
          }
        }
      },
      animation: {
        modalAnimation : 'slideDown 0.5s'
      }
    },
  },
  plugins: [],
}
