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
    extend: {
      fontSize: {
        "xs": "0.563rem",
        "sm": "0.75rem",
        "md": "1.333rem",
        "lg": "1.777rem",
        "xl": "2.369rem",
        "2xl": "3.157rem",
        "3xl": "4.209rem",
        "4xl": "5.61rem",
        "5xl": "7.478rem",
        "6xl": "9.969rem",
        "7xl": "13.288rem",
        "8xl": "17.713rem",
        "9xl": "23.612rem",
      },
    },
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
