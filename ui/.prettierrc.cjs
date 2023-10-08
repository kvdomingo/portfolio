/** @type {import("prettier").Options} */
module.exports = {
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "lf",
  importOrder: [
    "^astro(.*)",
    "^@astro(.*)",
    "^svelte(.*)",
    "^@svelte(.*)",
    "^react(.*)",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  jsxSingleQuote: false,
  quoteProps: "consistent",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  plugins: [
    import("prettier-plugin-astro"),
    import("prettier-plugin-svelte"),
    import("@trivago/prettier-plugin-sort-imports"),
    import("prettier-plugin-tailwindcss"),
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
      },
    },
  ],
};
