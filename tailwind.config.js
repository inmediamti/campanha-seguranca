/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#171717',
        label: '#404040',
        muted: '#525252',
        placeholder: '#737373',
        disabled: '#A3A3A3',
        line: '#E5E5E5',
        'line-strong': '#D4D4D4',
        surface: '#FAFAFA',
        'surface-alt': '#F5F5F5',
        brand: '#FACC15',
        'brand-hover': '#EAB308',
        'brand-ink': '#CA8A04',
        'brand-soft': '#FEFCE8',
        danger: '#DC2626',
        'danger-soft': '#FEE2E2',
        warn: '#EA580C',
        'warn-soft': '#FFEDD5',
        ok: '#16A34A',
        'ok-soft': '#DCFCE7',
      },
      borderRadius: {
        DEFAULT: '8px',
        card: '12px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(23,23,23,0.04), 0 1px 3px rgba(23,23,23,0.06)',
        modal: '0 10px 30px rgba(23,23,23,0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
