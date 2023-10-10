import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "576px",
      md: "960px",
      lg: "1200px",
    },
    extend: {
      backgroundImage: {
        "body-texture":
          "url('https://www.transparenttextures.com/patterns/vintage-speckles.png')",
      },
      colors: {
        "light-one": "#fafafa",
        "light-two": "#e4e5f1",
        "light-three": "#d2d3db",
        "light-four": "#9394a5",
        "light-five": "#484b6a",
        "dark-one": "#161722",
        "dark-two": "#25273c",
        "dark-three": "#cacde8",
        "dark-four": "#e4e5f1",
        "dark-five": "#777a92",
        "purple-one": "#dbd8e3",
        "purple-two": "#5c5470",
        "blue-one": "#ADD8E6",
        "blue-two": "#4169E1",
        "red-one": "#FFA07A",
        "red-two": "#FF6B6B",
        "yellow-one": "#FFFFE0",
        "yellow-two": "#DAA520",
        "green-one": "#98FB98",
        "green-two": "#228B22",
      },
    },
  },
  plugins: [],
};
export default config;
