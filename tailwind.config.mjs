/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,mjs,ts,tsx}', './public/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d9a',
          950: '#312e81'
        },
        background: {
          DEFAULT: '#f5f5f5',
          dark: '#111111'
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1a1a1a'
        },
        border: {
          DEFAULT: '#e5e5e5',
          dark: '#333333'
        },
        muted: {
          DEFAULT: '#f0f0f0',
          dark: '#222222',
          foreground: '#737373'
        },
        foreground: {
          DEFAULT: '#1a1a1a',
          dark: '#e5e5e5'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'monospace']
      },
      borderRadius: {
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem'
      }
    }
  },
  plugins: []
}