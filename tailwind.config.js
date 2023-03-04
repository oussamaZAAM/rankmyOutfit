/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pingonce': 'ping 0.5s ease-in',
        'wiggle': 'wiggle 0.45s ease-in',
        'bouncing': 'bouncing 1s infinite ease-out',
      },
      keyframes: {
          ping: {
            '75%, 100%': {
              transform: 'scale(5)',
              opacity: '0'
            },
          },
          wiggle: {
            '0%': { transform: 'rotate(0deg)' },
            '50%': { transform: 'rotate(-25deg) scale(1.15)' },
            '100%': { transform: 'rotate(0deg)' },
          },
          bouncing: {
            '0%': { transform: 'translateY(0)'},
            '50%': { transform: 'translateY(-12px) scaleY(0.8)'},
            '100%': { transform: 'translateY(0)'},
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
  darkMode: 'false',
}
