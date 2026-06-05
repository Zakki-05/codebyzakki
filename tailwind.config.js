/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--bg-primary)',
          bgSec: 'var(--bg-secondary)',
          card: 'var(--card-bg)',
          cardHover: 'var(--card-hover)',
          accent: 'var(--accent)',
          accentGlow: 'var(--accent-glow)',
          accentSec: 'var(--accent-secondary)',
          text: 'var(--text-primary)',
          textSec: 'var(--text-secondary)',
          textMuted: 'var(--text-muted)',
          border: 'var(--border-color)',
          borderHover: 'var(--border-hover)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        satoshi: ['Space Grotesk', 'Inter', 'sans-serif']
      },
      backgroundImage: {
        'futuristic-gradient': 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
        'neon-glow': 'radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 100%)'
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' }
        },
        'glow-pulse': {
          '0%': { boxShadow: '0 0 10px rgba(56, 189, 248, 0.1), 0 0 20px rgba(139, 92, 246, 0.05)' },
          '100%': { boxShadow: '0 0 25px rgba(56, 189, 248, 0.3), 0 0 45px rgba(139, 92, 246, 0.15)' }
        }
      }
    },
  },
  plugins: [],
}
