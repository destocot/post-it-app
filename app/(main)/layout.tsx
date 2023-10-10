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
    .select("username, name")
    .eq("id", userId)
    .single();

  let display = null;
  if (user) {
    display = user.username || user.name;
  }

  return (
    <>
      <ThemeButton />
      <Navbar display={display} logout={true} />
      {children}
      <footer className="flex justify-center items-center py-4 h-12">
        <p>
          Khurram Ali - Stick-It! - &copy; 2023
        </p>
      </footer>
    </>
  )
}
