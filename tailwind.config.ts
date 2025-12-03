import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        anime: {
          purple: "#6200EA",
          pink: "#E040FB",
          blue: "#00B0FF",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
