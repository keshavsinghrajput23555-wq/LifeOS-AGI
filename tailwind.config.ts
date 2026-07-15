import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brandBlue: '#1E3A8A',
        brandGreen: '#16A34A',
        brandBg: '#F3F4F6'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        dev: ['Noto Sans Devanagari', 'sans-serif']
      }
    }
  }
} satisfies Config;
