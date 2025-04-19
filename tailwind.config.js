/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      }
    },
    shadow: {
      DEFAULT: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      'sm': '0 0 5px 0 rgba(0, 0, 0, 0.1)',
      'md': '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      'lg': '0 0 15px 0 rgba(0, 0, 0, 0.1)',
      'xl': '0 0 20px 0 rgba(0, 0, 0, 0.1)',
      '2xl': '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      '3xl': '0 0 15px 0 rgba(0, 0, 0, 0.1)',
      '4xl': '0 0 20px 0 rgba(0, 0, 0, 0.1)',
    },
    borderRadius: {
      '10xl': '5rem',
      '8xl': '4rem',
      '9xl': '4.5rem',
      '7xl': '3.5rem',
      '6xl': '3rem',
      '5xl': '2.5rem',
      '4xl': '2rem',
      '2xl': '1.5rem',
      xl: '1rem',
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
      xs: '2px',
      full: '9999px',
    },
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
    screens: {
      'xxs': '360px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    }

  },
  plugins: [require('tailwindcss-animate')],
}

