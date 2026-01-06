import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        antonio: ['Antonio', 'sans-serif'],
        syncopate: ['Syncopate', 'sans-serif'],
      },
      colors: {
        background: "#050505", // Deep black
        foreground: "#ffffff",
        primary: "#ffafb6", // Pink (formerly Cyan)
        secondary: "#fb7185", // Darker Pink/Red (formerly Blue)
        accent: "#ffafb6", // Pink
        'lenis-pink': '#ffafb6',
        'lenis-dark': '#0a0a0a',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
