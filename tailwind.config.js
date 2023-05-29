/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '70vh',
      },
      backgroundImage: {
        'cat-gui': "url('./src/assets/categories/gui.png')",
        'cat-animations': "url('./src/assets/categories/animations.png')",
        'cat-optimization': "url('./src/assets/categories/optimization.png')",
        'cat-generation': "url('./src/assets/categories/generation.png')",
        'cat-mobs': "url('./src/assets/categories/mobs.png')",
        'cat-rpg': "url('./src/assets/categories/rpg.png')",
        'cat-food': "url('./src/assets/categories/food.png')",
        'cat-structures': "url('./src/assets/categories/structures.png')",
      },
      fontFamily: {
        'Comfortaa': ['Comfortaa', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#fffdf3',
          100: '#fff9c6',
          200: '#fff59e',
          300: '#ffed73',
          400: '#ffe14a',
          500: '#ffd700',
          600: '#ccae00',
          700: '#997f00',
          800: '#664f00',
          900: '#332700',
          // Define custom shades and tints
          'light': '#fff9c6',
          'dark': '#997f00',
        },
        bronze: {
          50: '#f9d6b6',
          100: '#f2b28d',
          200: '#e68c61',
          300: '#d65c2c',
          400: '#b14d1f',
          500: '#8e3e14',
          600: '#6d3311',
          700: '#56290f',
          800: '#3f200d',
          900: '#1d0c05',
        },
      }
    },
  },
  plugins: [],
}

