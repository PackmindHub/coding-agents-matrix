/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'rgb(15 23 42)',      // slate-900
          elevated: 'rgb(30 41 59)',  // slate-800
          hover: 'rgb(51 65 85)',     // slate-700
        },
        brand: {
          primary: 'rgb(139 92 246)',       // violet-500
          'primary-hover': 'rgb(124 58 237)', // violet-600
          secondary: 'rgb(168 85 247)',     // purple-500
        },
        status: {
          success: 'rgb(16 185 129)',   // emerald-500
          warning: 'rgb(245 158 11)',   // amber-500
          error: 'rgb(244 63 94)',      // rose-500
          info: 'rgb(59 130 246)',      // blue-500
        },
        text: {
          primary: 'rgb(241 245 249)',    // slate-100
          secondary: 'rgb(226 232 240)',  // slate-200
          tertiary: 'rgb(203 213 225)',   // slate-300
          muted: 'rgb(148 163 184)',      // slate-400
          subtle: 'rgb(100 116 139)',     // slate-500
          disabled: 'rgb(71 85 105)',     // slate-600
        },
        border: {
          default: 'rgb(51 65 85)',     // slate-700
          subtle: 'rgb(71 85 105)',     // slate-600
          interactive: 'rgb(100 116 139)', // slate-500
        },
      },
      fontSize: {
        display: ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],  // 36px
        'heading-lg': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }], // 30px
        'heading-md': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],  // 24px
        'heading-sm': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }], // 20px
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        body: ['1rem', { lineHeight: '1.5rem' }],           // 16px
        caption: ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
      },
      fontWeight: {
        light: '300',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        'card-padding': '1.5rem',   // 24px
        'section-gap': '2rem',      // 32px
        'element-gap': '1rem',      // 16px
        'tight-gap': '0.5rem',      // 8px
      },
      borderRadius: {
        card: '1rem',      // 16px
        element: '0.75rem', // 12px
        button: '0.5rem',   // 8px
      },
      boxShadow: {
        'brand-sm': '0 1px 2px 0 rgb(139 92 246 / 0.05)',
        'brand': '0 4px 6px -1px rgb(139 92 246 / 0.1), 0 2px 4px -2px rgb(139 92 246 / 0.1)',
        'brand-lg': '0 10px 15px -3px rgb(139 92 246 / 0.1), 0 4px 6px -4px rgb(139 92 246 / 0.1)',
        'brand-xl': '0 20px 25px -5px rgb(139 92 246 / 0.1), 0 8px 10px -6px rgb(139 92 246 / 0.1)',
        'glow-violet-sm': '0 0 10px rgba(139, 92, 246, 0.3)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.4)',
      },
      transitionDuration: {
        fast: '200ms',
        normal: '300ms',
      },
      backdropBlur: {
        glass: '24px',
      },
    },
  },
  plugins: [],
}
