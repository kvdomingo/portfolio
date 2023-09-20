/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      screens: {
        "2xl": "1400px",
      },
      center: true,
      padding: "2rem",
    },
    extend: {},
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-opentype")],
};
