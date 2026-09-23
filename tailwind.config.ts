import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orthodox: {
          gold: "#D4AF37",
          "gold-light": "#F3E5AB",
          "gold-dark": "#AA820A",
          burgundy: "#7A1C28",
          "burgundy-dark": "#4E1019",
          "burgundy-light": "#9E2A3B",
          navy: "#1B2A4A",
          "navy-dark": "#0F172A",
          parchment: "#FBF8F2",
          "parchment-dark": "#EFE9DC",
          candle: "#FFF4D2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
