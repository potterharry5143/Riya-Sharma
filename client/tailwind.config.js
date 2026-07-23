/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        theme: {
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          'card-bg': 'var(--color-card-bg)',
          'card-border': 'var(--color-card-border)',
          'text-main': 'var(--color-text-main)',
          'text-muted': 'var(--color-text-muted)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':       { transform: 'translateY(-18px) rotate(6deg)' },
          '66%':       { transform: 'translateY(-8px) rotate(-4deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
          '50%':      { transform: 'translateY(-24px) rotate(12deg) scale(1.05)' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 12px 2px rgba(255,179,198,0.5)' },
          '50%':      { boxShadow: '0 0 28px 8px rgba(212,187,255,0.7)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%':      { transform: 'rotate(3deg)' },
        },
        'bounce-in': {
          '0%':   { transform: 'scale(0)', opacity: '0' },
          '60%':  { transform: 'scale(1.15)', opacity: '1' },
          '80%':  { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        float:          'float 6s ease-in-out infinite',
        'float-slow':   'float-slow 9s ease-in-out infinite',
        'float-slower': 'float-slow 13s ease-in-out infinite',
        pulse_glow:     'pulse_glow 2.5s ease-in-out infinite',
        wiggle:         'wiggle 0.5s ease-in-out infinite',
        'bounce-in':    'bounce-in 0.6s cubic-bezier(0.36,0.07,0.19,0.97) both',
        shimmer:        'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
