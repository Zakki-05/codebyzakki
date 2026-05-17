/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#050505',
          secondary: '#0f0f0f',
          card: 'rgba(255, 255, 255, 0.03)',
          cardHover: 'rgba(255, 255, 255, 0.08)'
        },
        neon: {
          blue: '#00f0ff',
          purple: '#8b5cf6',
          pink: '#ec4899'
        },
        text: {
          white: '#ffffff',
          gray: '#b3b3b3',
          dark: '#555555'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        satoshi: ['Satoshi', 'Inter', 'sans-serif']
      },
      backgroundImage: {
        'futuristic-gradient': 'linear-gradient(135deg, #00f0ff, #8b5cf6)',
        'neon-glow': 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 100%)',
        'dark-radial': 'radial-gradient(circle at center, #0f0f0f 0%, #050505 100%)'
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'border-flow': 'border-flow 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' }
        },
        'glow-pulse': {
          '0%': { boxShadow: '0 0 10px rgba(0, 240, 255, 0.2), 0 0 20px rgba(139, 92, 246, 0.1)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 240, 255, 0.5), 0 0 45px rgba(139, 92, 246, 0.3)' }
        }
      }
    },
  },
  plugins: [],
}
