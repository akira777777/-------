/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
        heading: ["Syne", "sans-serif"],
        body: ["Inter", "Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
