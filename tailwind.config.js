/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0070F3",
        secondary: "#7928CA",
      },
      height: {
        banner: "80vh",
        bannerMobile: "70vh",
        98: "26rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
