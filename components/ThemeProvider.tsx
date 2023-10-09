"use client"
import { useEffect } from "react"
import resolveConfig from 'tailwindcss/resolveConfig'
import myConfig from '@/tailwind.config'


export default function ThemeProvider({
  children, theme
}: {
  children: React.ReactNode,
  theme: string
}) {
  const tailwindConfig = resolveConfig(myConfig)
  const colors = tailwindConfig.theme?.colors!;
  // console.log(theme);
  useEffect(() => {
    // document.body.classList.remove("blueTheme");
    // document.body.classList.remove("greenTheme");
    // document.body.classList.remove("yellowTheme");
    // document.body.classList.remove("redTheme");

    switch (theme) {
      case "blue":
        document.body.style.backgroundColor = colors["blue-shade-four"] as string;
        document.body.classList.add("blueTheme");
        break;
      case "green":
        document.body.style.backgroundColor = colors["green-shade-four"] as string;
        document.body.classList.add("greenTheme");
        break;
      case "yellow":
        document.body.style.backgroundColor = colors["yellow-shade-four"] as string;
        document.body.classList.add("yellowTheme");
        break;
      case "red":
        document.body.style.backgroundColor = colors["red-shade-four"] as string;
        document.body.classList.add("redTheme");
        break;
      default:
        document.body.style.backgroundColor = colors["shade-four"] as string;
        break;
    }
  }, [theme, colors])

  return (
    <>
      {children}
    </>
  )
}