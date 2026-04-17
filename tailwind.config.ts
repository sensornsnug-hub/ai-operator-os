import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0b1020",
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81"
        }
      },
      boxShadow: {
        glass: "0 10px 40px rgba(15,23,42,0.18)"
      },
      backgroundImage: {
        "grid-fade": "radial-gradient(circle at top, rgba(99,102,241,0.15), transparent 35%), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)"
      },
      backgroundSize: {
        "grid-fade": "100% 100%, 32px 32px, 32px 32px"
      }
    }
  },
  plugins: []
};

export default config;
