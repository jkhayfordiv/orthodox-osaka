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
          // Western Diocese Heritage Colors (modernized from original orthodox-jp.com/westjapan)
          pine: "#0F4D32",          // original #006633 diocesan green
          "pine-light": "#E8F5E9",
          "pine-dark": "#0A3321",
          celestial: "#EBF8FA",      // modernized soft sky-cyan from original #e8fdff
          "celestial-dark": "#0C232F",
        },
      },
    },
  },
  plugins: [],
};
export default config;
