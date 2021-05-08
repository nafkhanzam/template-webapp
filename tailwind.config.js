module.exports = {
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx,css}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-debug-screens")],
};
