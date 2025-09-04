/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        display: ["var(--font-display)", "var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        brand: {
          pink: "#ff4ecd",
          purple: "#7c3aed",
          cyan: "#06b6d4",
          amber: "#f59e0b",
        },
      },
      boxShadow: {
        glow: "0 0 0 2px rgba(255,78,205,.12), 0 12px 40px rgba(124,58,237,.22)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "gradient-move": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(10px,-8px) scale(1.05)" },
          "66%": { transform: "translate(-8px,6px) scale(0.98)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "gradient-move": "gradient-move 8s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        blob: "blob 12s ease-in-out infinite",
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
