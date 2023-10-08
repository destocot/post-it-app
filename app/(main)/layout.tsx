import Navbar from "@/components/Navbar"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const links = [
  { href: "/", label: "🏠 Home" }
]

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // redirect user if they do not have a session
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/landing')
  }

  const userId = session.user.id;
  const { data: { username } } = await supabase.from("profiles")
    .select()
    .eq("id", userId)
    .single();

  return (
    <>
      <Navbar links={links} username={username} logout={true} />
      {children}
    </>
  )
}
