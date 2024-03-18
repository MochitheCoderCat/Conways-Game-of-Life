/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      customFont: ['"Custom Font"', "sans-serif"],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
