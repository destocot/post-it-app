import Navbar from "@/components/Navbar"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const links = [
  { href: "/signup", label: "⬆️ Signup" },
  { href: "/login", label: "↪️ Login" },
  { href: "/landing", label: "🏝️ Landing" },
]

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // redirect user if they have a session (logged in)
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  if (data.session) {
    redirect('/')
  }

  return (
    <>
      <Navbar links={links} username={""} logout={false} />
      {children}
    </>
  )
}
