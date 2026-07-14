/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          DEFAULT: '#E8622A',
          deep:    '#C24A18',
        },
        amber:    '#E8A33D',
        charcoal: '#1F1B18',
        cream:    '#FBF6EF',
        wood:     '#8A5A3B',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        manrope:  ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FBF6EF 0%, #fff 55%, #fdf0e8 100%)',
      },
    },
  },
  plugins: [],
}
