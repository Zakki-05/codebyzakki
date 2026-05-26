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
          primary: '#030303',      // Absolute luxury dark background
          secondary: '#09090b',    // Premium zinc-950
          card: 'rgba(255, 255, 255, 0.02)', // Ultra-light Vercel card fill
          cardHover: 'rgba(255, 255, 255, 0.05)'
        },
        neon: {
          blue: '#00f0ff',        // Cyan-400 / electric blue
          purple: '#8b5cf6',      // Violet-500 / warm slate purple
          pink: '#ec4899',        // Rose-500
          teal: '#10b981'         // Emerald-500
        },
        text: {
          white: '#fafafa',       // Sleek off-white (zinc-50)
          gray: '#8e9196',        // Muted gray-zinc-400 for high-end text readability
          dark: '#3f3f46'         // Dark zinc-700 for dividers/sub-headers
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        satoshi: ['Space Grotesk', 'Inter', 'sans-serif']
      },
      backgroundImage: {
        'futuristic-gradient': 'linear-gradient(135deg, #00f0ff, #8b5cf6)',
        'neon-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.08) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
        'dark-radial': 'radial-gradient(circle at center, #09090b 0%, #030303 100%)'
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'border-flow': 'border-flow 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' }
        },
        'glow-pulse': {
          '0%': { boxShadow: '0 0 10px rgba(0, 240, 255, 0.15), 0 0 20px rgba(139, 92, 246, 0.05)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.35), 0 0 35px rgba(139, 92, 246, 0.15)' }
        }
      }
    },
  },
  plugins: [],
}
