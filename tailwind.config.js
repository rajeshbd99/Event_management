// tailwind.config.cjs
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8fb',
          100: '#fde8f2',
          200: '#f8c5e3',
          300: '#f29ed0',
          400: '#ed6fb9',
          500: '#db3aa0',
          600: '#b82b85',
          700: '#8a1f63',
          800: '#5f1543',
          900: '#3a0c2a'
        },
        accent: {
          500: '#00d4a5'
        },
        muted: {
          500: '#6b7280'
        }
      },
      boxShadow: {
        'card': '0 8px 30px rgba(16,24,40,0.08)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg,#ff7eb6 0%,#7afcff 100%)',
        'card-gradient': 'linear-gradient(90deg,#ffd4a3, #f6a6ff)'
      }
    },
  },
  plugins: [],
}
