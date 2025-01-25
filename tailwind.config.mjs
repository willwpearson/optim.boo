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
        black: "#000",
        white: "#fff",
        midnightLight: "#4C4A6C",
        midnight: "#332941",
        midnightDark: "#1E1A2A",
        plumLight: "#4C46A6",
        plum: "#3B3486",
        plumDark: "#2C2649",
        violetLight: "#A56CC1",
        violet: "#864AF9",
        violetDark: "#6A29A4",
        sunflowerLight: "#F9E9A4",
        sunflower: "#F8E559",
        sunflowerDark: "#CFAF2B",
        goldLight: "#F9DFA4",
        gold: "#FFD700",
        goldDark: "#DAA520",
        sunsetOrangeLight: "#F9AFA4",
        sunsetOrange: "#FF4500",
        sunsetOrangeDark: "#FF6347",
      },
    },
  },
  plugins: [],
};
