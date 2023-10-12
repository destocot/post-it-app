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
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      backgroundImage: {
        "profile-banner":
          "url('https://images.unsplash.com/photo-1586892478377-bb79da0a70c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
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
