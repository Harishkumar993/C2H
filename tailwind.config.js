/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          DEFAULT: '#00F2FE',
          light: '#4FACFE',
          glow: 'rgba(0,242,254,0.35)',
        },
        copper: {
          DEFAULT: '#FF6B35',
          light: '#F39C12',
          glow: 'rgba(255,107,53,0.35)',
        },
        emerald: {
          dark: '#030A09',
          card: 'rgba(6,20,18,0.80)',
          glass: 'rgba(10,30,26,0.65)',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        alt: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'spin-reverse': 'spin 20s linear infinite reverse',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-cyan': 'pulseCyan 2s ease-in-out infinite',
        'shimmer-fast': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseCyan: {
          '0%,100%': { boxShadow: '0 0 20px rgba(0,242,254,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(0,242,254,0.7), 0 0 80px rgba(0,242,254,0.25)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
