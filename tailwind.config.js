/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066B3',
          50: '#E6F2FA',
          100: '#CCE5F5',
          200: '#99CBE8',
          300: '#66B1DC',
          400: '#3397CF',
          500: '#0066B3',
          600: '#00528F',
          700: '#003D6B',
          800: '#002947',
          900: '#001424',
        },
        accent: {
          DEFAULT: '#E30613',
          50: '#FCE7E8',
          100: '#F9CFD1',
          200: '#F39FA3',
          300: '#ED6F75',
          400: '#E73F47',
          500: '#E30613',
          600: '#B6050F',
          700: '#88040B',
          800: '#5B0308',
          900: '#2D0104',
        },
        navy: {
          DEFAULT: '#1A1A40',
          50: '#E8E8F0',
          100: '#D1D1E1',
          200: '#A3A3C3',
          300: '#7575A5',
          400: '#474787',
          500: '#1A1A40',
          600: '#151533',
          700: '#101026',
          800: '#0A0A1A',
          900: '#05050D',
        },
        textGray: '#4B5563',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
