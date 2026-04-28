/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0D12",
        surface: "#141720",
        surfaceRaised: "#1C2030",
        border: "#252A3A",
        textPrimary: "#F0F2F7",
        textSecondary: "#8892A4",
        textMuted: "#4A5568",
        accent: "#2DD4BF",
        accentDim: "#134E4A",
        accentText: "#5EEAD4",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
