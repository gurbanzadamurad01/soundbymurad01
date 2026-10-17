/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#0b0b0d', 900: '#111114', 800: '#18181c', 700: '#232329', 600: '#2e2e36' },
        accent: { DEFAULT: '#ff4d6d', soft: '#ff8fa3' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      keyframes: {
        bar: { '0%,100%': { transform: 'scaleY(0.3)' }, '50%': { transform: 'scaleY(1)' } },
        fadeup: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        bar: 'bar 0.9s ease-in-out infinite',
        fadeup: 'fadeup 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
