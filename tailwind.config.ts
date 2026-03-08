import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#10B981",
        accent: "#F59E0B",
        danger: "#EF4444",
        success: "#22C55E",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-fredoka)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        game: "1rem",
      },
      boxShadow: {
        game: "0 4px 0 0 rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
