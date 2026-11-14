/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0A1B3D',
        blue: '#2150E8',
        gold: '#D9A020',
        mist: '#EEF4FA',
        'gold-light': '#F7CD62',
        'gold-tint': '#FFF4D6',
        'gold-text': '#7A5410',
        border: '#DCE5F1',
        green: '#1E9E73',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Libre Baskerville', 'serif'],
      },
      boxShadow: {
        soft: '0 8px 22px rgba(12, 26, 56, 0.06)',
      },
    },
  },
  plugins: [],
};

