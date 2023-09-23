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
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-opentype"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        studio: {
          "primary": "#818cf8",
          "secondary": "#1fb2a6",
          "accent": "#ffffff",
          "neutral": "#2a323c",
          "base-100": "#321e81",
          "base-200": "#1e1b4b",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
};
