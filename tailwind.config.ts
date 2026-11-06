import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        forest: 'rgb(var(--forest) / <alpha-value>)',
        sage: 'rgb(var(--sage) / <alpha-value>)',
        clay: 'rgb(var(--clay) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        onaccent: 'rgb(var(--on-accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      borderRadius: { '4xl': '2rem' },
      boxShadow: {
        soft: '0 1px 2px rgb(36 35 31 / .04), 0 12px 32px -12px rgb(36 35 31 / .14)',
        lift: '0 2px 4px rgb(36 35 31 / .05), 0 24px 48px -16px rgb(36 35 31 / .22)',
      },
      maxWidth: { page: '76rem' },
    },
  },
  plugins: [],
} satisfies Config;
