/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Hyresgästföreningen Red
        primary: {
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
        // CTA/Accent Colors - Orange
        cta: {
          DEFAULT: '#E85D04',
          50: '#FDF2E9',
          100: '#FAE4D3',
          200: '#F5C9A7',
          300: '#F0AE7B',
          400: '#EB9350',
          500: '#E85D04',
          600: '#B84A03',
          700: '#8A3802',
          800: '#5C2502',
          900: '#2E1301',
        },
        // Accent Colors - Keep red as accent
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
        // Navy Colors - Dark Slate for footer
        navy: {
          DEFAULT: '#1E293B',
          50: '#E8EAF0',
          100: '#D1D5E1',
          200: '#A3AAC3',
          300: '#7580A5',
          400: '#475587',
          500: '#1E293B',
          600: '#182131',
          700: '#121925',
          800: '#0C1118',
          900: '#06080C',
        },
        // Semantic Text Colors
        text: {
          primary: '#1A1A2E',    // Dark navy/black
          secondary: '#374151',   // gray-700
          muted: '#6B7280',      // gray-500
          light: '#9CA3AF',      // gray-400
          inverse: '#ffffff',    // white
        },
        // Semantic Background Colors
        background: {
          DEFAULT: '#fafbfc',
          secondary: '#f8fafc',  // slate-50
          tertiary: '#f1f5f9', // slate-100
          card: '#ffffff',
        },
        // Semantic Border Colors
        border: {
          DEFAULT: '#e5e7eb',    // gray-200
          light: '#f3f4f6',      // gray-100
          strong: '#d1d5db',     // gray-300
        },
        // Status Colors
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        textGray: '#4B5563',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      letterSpacing: {
        tight: '-0.02em',
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
