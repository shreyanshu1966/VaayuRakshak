/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3fa',
          100: '#cce7f5',
          200: '#99cfeb',
          300: '#66b7e0',
          400: '#339fd6',
          500: '#0077B6', // Primary Trust/Safety Blue
          600: '#006699',
          700: '#004d73',
          800: '#00334d',
          900: '#001a26',
        },
        alert: {
          50: '#fff2ef',
          100: '#ffe6df',
          200: '#ffccbf',
          300: '#ffb39f',
          400: '#ff997f',
          500: '#FF6B35', // Alert Orange
          600: '#cc562b',
          700: '#994020',
          800: '#662b15',
          900: '#33150b',
        },
        success: {
          50: '#e6f7ee',
          100: '#ccefdc',
          200: '#99dfb9',
          300: '#66cf97',
          400: '#33bf74',
          500: '#27AE60', // Success Green
          600: '#1f8b4d',
          700: '#17683a',
          800: '#0f4526',
          900: '#082213',
        },
        gray: {
          50: '#F4F4F4', // Background Light Grey
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#2C2C2C', // Text Charcoal
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};