/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: "#0B0B0E",
        surface: "#14141A",
        gold: {
          DEFAULT: "#D4AF37",
          rose: "#E0A98B",
        },
        titanium: "#A9A9A9",
      },
      fontFamily: {
        heading: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["'Plus Jakarta Sans'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      scrollMargin: {
        nav: '80px',
      },
      scale: {
        '108': '1.08',
      },
      transitionDuration: {
        '400': '400ms',
        '350': '350ms',
        '250': '250ms',
      },
      backdropBlur: {
        '2xl': '40px',
      },
    },
  },
  plugins: [],
}
