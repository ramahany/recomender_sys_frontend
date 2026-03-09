import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0b0f",
        card: "#111118",
        accent: "#8b5cf6",
        accentSecondary: "#a855f7"
      },
      boxShadow: {
        "purple-glow": "0 0 30px rgba(139, 92, 246, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;

