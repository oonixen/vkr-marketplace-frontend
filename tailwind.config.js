/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      lg: { max: '1299.99px' },
      md: { max: '991.99px' },
      sm: { max: '767.99px' },
      xs: { max: '479.99px' }
    },
    extend: {
      spacing: {
        xs: '0.5rem',
        s: '0.75rem',
        m: '1rem',
        xl: '1.25rem',
        xxl: '1.5rem'
      },
      backgroundColor: {
        'white-transparent': 'hsla(0,0%,100%,.9)',
        'gray-transparent': 'rgba(0,0,0,.6)'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      keyframes: {
        loaderFw: {
          '0%': {
            width: 0
          },
          '100%': {
            width: '100%'
          }
        }
      }
    },
  }
}

