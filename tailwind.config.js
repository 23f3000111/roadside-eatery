/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent:        'rgb(var(--accent) / <alpha-value>)',
        'accent-deep': 'rgb(var(--accent-deep) / <alpha-value>)',
        gold:          'rgb(var(--gold) / <alpha-value>)',
        ink:           'rgb(var(--ink) / <alpha-value>)',
        'ink-deep':    'rgb(var(--ink-deep) / <alpha-value>)',
        surface:       'rgb(var(--surface) / <alpha-value>)',
        muted:         'rgb(var(--muted) / <alpha-value>)',
        tint:          'rgb(var(--tint) / <alpha-value>)',
        line:          'rgb(var(--line) / <alpha-value>)',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        manrope:  ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
