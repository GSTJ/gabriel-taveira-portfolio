import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plusjakartasans", "SF Pro Display", "Poppins", "sans-serif"],
      },
    },
  },
} satisfies Config;
