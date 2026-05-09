/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      colors: {
        midnight: {
          950: "#070417",
          900: "#0c0826",
          800: "#150f3a",
          700: "#1d1551",
          600: "#2a1f6b",
        },
        plum: {
          500: "#6d4dc7",
          400: "#8b6ae0",
          300: "#a98ff0",
        },
        gold: {
          200: "#ffe9b8",
          300: "#ffd98a",
          400: "#ffc864",
          500: "#ffae3c",
        },
        rose: {
          glow: "#ff8da1",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 200, 130, 0.35)",
        glowPlum: "0 0 60px rgba(169, 143, 240, 0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "twinkle": "twinkle 3s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "drift": "drift 60s linear infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(110%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
