/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        gray: {
          500: "#bebebe",
        },
        black: {
          300: "#171c25",
          500: "#1a090d",
        },
        red: {
          500: "#fe3632",
        },
        blue: {
          100: "#D8E3EE",
          500: "#006ebc",
        },
        lime: {
          500: "#ccff66",
        },
        teal: {
          500: "#1e7d94",
        },
        purple: {
          500: "#4f4f75",
        },
      },
      dropShadow: {
        md: "1px 0px 1.75px #006ebc",
        mdHover: "1px 0px 1.75px #fe3632",
        mdDark: "1px 0px 1.75px #bebebe",
        mdDarkHover: "1px 0px 1.75px #ccff66",
      },
    },
  },
  plugins: [],
};
