"use client"
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { BiSun, BiSolidMoon } from "react-icons/bi";
import { Database } from "@/types/database.types";

export default function ThemeButton() {
  const [darkmode, setDarkmode] = useState(false);
  // redirect user if they do not have a session]

  useEffect(() => {
    const getTheme = async () => {
      const supabase = createClientComponentClient<Database>();
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const userId = session.user.id;

        const { data, error } = await supabase.from("profiles")
          .select("dark_mode")
          .eq("id", userId)
          .single();

        // if (error) {
        //   throw new Error(error.message);
        // }

        if (data && data.dark_mode) {
          document.documentElement.classList.add("dark");
          setDarkmode(true);
        } else {
          document.documentElement.classList.remove("dark");
          setDarkmode(false);
        }
      }
    }
    getTheme();
  }, [])

  const clickHandler = async () => {
    const supabase = createClientComponentClient<Database>();
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const userId = session.user.id;

      await supabase
        .from("profiles")
        .update({ "dark_mode": !darkmode })
        .eq('id', userId)
        .select()
        .single();

      document.documentElement.classList.toggle("dark");
      setDarkmode(state => !state);
    }
  };

  return (
    <button className="absolute top-4 right-4 hover:scale-110" onClick={() => clickHandler()}>{darkmode ? <BiSolidMoon className="light-one font-bold text-3xl" /> : <BiSun className="dark-one font-bold text-3xl" />}</button>
  )
}