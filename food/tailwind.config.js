/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F6FB7A",
        secondary: "#FFDA76",
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
        blue: {
          DEFAULT: "#7469B6"
        }
      },
      fontFamily: {
        obold: ["Oswald-Bold", "sans-serif"],
        oextralight: ["Oswald-ExtraLight", "sans-serif"],
        olight: ["Oswald-Light", "sans-serif"],
        oregular: ["Oswald-Regular", "sans-serif"],
        omedium: ["Oswald-Medium", "sans-serif"],
        osemibold: ["Oswald-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};