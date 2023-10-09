"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi"

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signOut()

    if (!error) {
      router.refresh();
      router.push("/landing");
    }
  };

  return (
    <button onClick={logout} className="flex gap-1 items-center"><BiLogOut /> Logout</button>
  )
}