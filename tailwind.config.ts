import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1D4ED8", // Primary blue
          dark: "#1E3A8A",    // Dark blue
          bg: "#EFF6FF",      // Light blue background
          accent: "#38BDF8",  // Accent sky
          success: "#16A34A", // Success green
          warning: "#F59E0B", // Warning amber
          text: "#0F172A",    // Main text
          muted: "#64748B",   // Muted slate
          border: "#E2E8F0",  // Subtle border
          card: "#FFFFFF",    // White cards
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Noto Sans Sinhala",
          "Noto Sans Tamil",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(15, 23, 42, 0.06), 0 4px 16px -2px rgba(15, 23, 42, 0.04)",
        card: "0 4px 20px -2px rgba(29, 78, 216, 0.06), 0 2px 8px -2px rgba(15, 23, 42, 0.04)",
        hover: "0 10px 25px -4px rgba(29, 78, 216, 0.12), 0 6px 12px -2px rgba(15, 23, 42, 0.06)",
        modal: "0 20px 40px -10px rgba(15, 23, 42, 0.25)",
      },
      borderRadius: {
        DEFAULT: "0.75rem", // 12px
        "xl": "0.875rem",   // 14px
        "2xl": "1rem",      // 16px
        "3xl": "1.5rem",    // 24px
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
    },
  },
  plugins: [],
};

export default config;
