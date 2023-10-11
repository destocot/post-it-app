"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  const clickHandler = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <button onClick={() => clickHandler()} className="shadow mb-2 py-2 px-5 text-3xl hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five"><FcGoogle /></button>
    </>
  )
}