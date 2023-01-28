/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pingonce': 'ping 0.3s ease-in-out',
      },
      keyframes: {
          ping: {
            '50%, 75%': {
              transform: 'scale(5)',
              opacity: '0'
            },
            '75%, 100%': {
              transform: 'scale(0.5)',
              opacity: '0'
            }
            // '75%, 100%': {
            //   transform: 'scale(2)',
            //   opacity: '0'
            // }
          }
      },
      colors: {
        'my-purple': '#6F1AB6',
        'my-pink1': '#EE88EE',
        'my-pink2': '#DB76DC',
        'soft-pink': '#FFF4FF',
      },
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Poppins'],
      'title': ['Oswald'],
      'subtitle': ['Alumni Sans'],
      'body': ['Alice'],
    },
    screens: {
      'fold': '280px',
      // => @media (min-width: 280px) { ... }

      'mobile': '400px',
      // => @media (min-width: 400px) { ... }

      'xs': '530px',
      // => @media (min-width: 530px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}
