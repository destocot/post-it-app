import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "shade-one": "#dbd8e3",
        "shade-two": "#5c5470",
        "shade-three": "#352f44",
        "shade-four": "#2a2438",
        whitesmoke: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
export default config;
