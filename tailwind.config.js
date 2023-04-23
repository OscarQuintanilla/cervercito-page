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
      }
    },
  },
  plugins: [],
}

