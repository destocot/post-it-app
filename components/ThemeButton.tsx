"use client"
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ThemeButton() {
  const [darkmode, setDarkmode] = useState(false);
  // redirect user if they do not have a session]

  useEffect(() => {
    const getTheme = async () => {
      const supabase = createClientComponentClient();
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        const userId = session.user.id;

        const { data, error } = await supabase.from("profiles")
          .select("dark_mode")
          .eq("id", userId)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (data.dark_mode) {
          document.documentElement.classList.add("dark");
          setDarkmode(true);
        }
      } else {
        document.documentElement.classList.remove("dark");
        setDarkmode(false);
      }
    }
    getTheme();
  }, [])

  return (
    <button onClick={() => {
      document.documentElement.classList.toggle("dark");
      setDarkmode(state => !state);
    }}>{darkmode ? "🌞" : "🌚"}</button>
  )
}