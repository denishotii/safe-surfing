/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Brand teal
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          300: '#5EEAD4',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          900: '#134E4A',
        },
        // Action coral
        coral: {
          50: '#FFF4F1',
          300: '#FCA28A',
          500: '#F97456',
          600: '#F56242',
          700: '#DC4A2B',
        },
        // Sand backgrounds
        sand: {
          50: '#FAF7F2',
          100: '#F6F1EA',
          200: '#EDE6D9',
          300: '#E0D5C5',
        },
        // Status
        go: {
          DEFAULT: '#059669',
          bg: '#ECFDF5',
          border: '#A7F3D0',
        },
        check: {
          DEFAULT: '#D97706',
          bg: '#FFFBEB',
          border: '#FDE68A',
        },
        avoid: {
          DEFAULT: '#DC2626',
          bg: '#FEF2F2',
          border: '#FECACA',
        },
        ink: {
          DEFAULT: '#0B1F2E',
          secondary: '#4A5568',
          muted: '#94A3B8',
        },
      },
      borderRadius: {
        'xs': '6px',
        'sm': '10px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(11,31,46,0.04), 0 4px 12px rgba(11,31,46,0.05)',
        'pop':  '0 6px 20px rgba(11,31,46,0.10), 0 2px 6px rgba(11,31,46,0.06)',
        'overlay': '0 20px 60px rgba(11,31,46,0.20), 0 8px 20px rgba(11,31,46,0.10)',
      },
      fontSize: {
        'micro': ['10px', { lineHeight: '14px', fontWeight: '700', letterSpacing: '0.08em' }],
        'caption': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'label': ['13px', { lineHeight: '18px', fontWeight: '600' }],
        'body': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'subtitle': ['18px', { lineHeight: '26px', fontWeight: '600' }],
        'title': ['22px', { lineHeight: '30px', fontWeight: '700' }],
        'hero': ['28px', { lineHeight: '34px', fontWeight: '700' }],
        'display': ['40px', { lineHeight: '44px', fontWeight: '800' }],
      },
    },
  },
  plugins: [],
}
