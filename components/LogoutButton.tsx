"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push("/landing");
    }
  };

  return (
    <button onClick={logout}>↩️ Logout</button>
  )
}