import Navbar from "@/components/Navbar"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/types/database.types"
import ThemeButton from "@/components/ThemeButton"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // redirect user if they do not have a session
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session }, error: err } = await supabase.auth.getSession()

  if (!session) {
    redirect('/landing')
  }

  const userId = session.user.id;
  const { data: user, error } = await supabase.from("profiles")
    .select("name, id, avatar_url")
    .eq("id", userId)
    .single();

  let display = null;
  let avatar = null;
  if (user) {
    display = user.name;
    avatar = user.avatar_url;
  }

  return (
    <>
      <ThemeButton />
      <Navbar display={display} avatar={avatar} />
      {children}
      <footer className="flex justify-center items-center py-8 mt-8 mb-4">
        <p>
          Khurram Ali - Stick-It! - &copy; 2023
        </p>
      </footer>
    </>
  )
}
