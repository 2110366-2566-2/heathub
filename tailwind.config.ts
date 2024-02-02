import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", ...fontFamily.sans],
      },
      screens: {
        md: "821px",
        lg: "1024px",
      },
      colors: {
        high: "#122f6e",
        medium: "#64748b",
        placeholder: "#94a3b8",
        invert: "#ffffff",
        disable: "#cbd5e1",
        bgColor: "#f0e9ff",
        primary: {
          50: "#f2ecff",
          100: "#c3d7ff",
          200: "#adbaff",
          300: "#8e9ff0",
          400: "#7b8cdf",
          500: "#6377cc",
          600: "#4c6abb",
          700: "#3c56a1",
          800: "#2d4288",
          900: "#122f6e",
        },
        secondary: {
          50: "#ffe2ec",
          100: "#ffb8ce",
          200: "#fa8bae",
          300: "#f55b8e",
          400: "#f13775",
          500: "#ed0a5d",
          600: "#db0059",
          700: "#c70457",
          800: "#b10053",
          900: "#8d004d",
          a100: "#ff7ba7",
          a200: "#ff377c",
          a400: "#f80051",
          a700: "#c9005c",
        },
        neutral: {
          0: "#ffffff",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
