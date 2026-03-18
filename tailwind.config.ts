import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          900: "#7c2d12"
        },
        warm: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1"
        }
      },
      boxShadow: {
        glow: "0 24px 80px rgba(249, 115, 22, 0.12)",
        soft: "0 10px 40px -10px rgba(0,0,0,0.05)"
      },
      keyframes: {
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "50%": { transform: "scale(1.1) translate(-1%, -1%)" },
          "100%": { transform: "scale(1) translate(0, 0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "ken-burns": "ken-burns 20s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
