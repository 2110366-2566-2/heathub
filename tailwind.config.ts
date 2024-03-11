import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withUt } from "uploadthing/tw";

const config = withUt({
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
        sans: ["var(--font-nunito)", ...fontFamily.sans],
      },
      screens: {
        sm: "376px",
        md: "782px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      colors: {
        high: "#122f6e",
        medium: "#64748b",
        subtle: "#F8FAFC",
        placeholder: "#94a3b8",
        invert: "#ffffff",
        disable: "#cbd5e1",
        bgColor: "#ffffff",
        error: {
          default: "#F86C6C",
          hover: "#E14C4C",
        },
        success: "#52D382",
        pending: "#FFC164",
        primary: {
          50: "#e4edff",
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
          50: "#FEF1F5",
          100: "#FEE5EE",
          200: "#FFCBDF",
          300: "#FFA1C3",
          400: "#FF80AA",
          500: "#FA3A74",
          600: "#EA184D",
          700: "#CC0A36",
          800: "#A80C2D",
          900: "#8C0F29",
          950: "#560113",
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
      status: {
        error: {
          default: "#F86C6C",
          hover: "#E14C4C",
        },
        pending: "#FFC164",
        success: "#52D382",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "36px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}) satisfies Config;

export default config;
