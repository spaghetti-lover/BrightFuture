import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1280px",
    },
    extend: {
      backgroundImage: {},
      colors: {
        "title-grey": "#757575",
        "primary-orange": "#EF5600",
        "dark-grey": "#9E9E9E",
        "text-grey": "#616161",
      },
    },
  },
  plugins: [],
};
export default config;
