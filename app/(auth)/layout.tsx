// import Navbar from "@/components/Navbar"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from "next/link"
import { FaRegStickyNote } from 'react-icons/fa'
import ThemeButton from '@/components/ThemeButton'

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
      <div className="z-10 absolute text-3xl top-4 left-4 flex gap-2 items-center">
        <Link href="/landing" className="hover:text-4xl"><FaRegStickyNote /></Link>
        <span className="hover:text-4xl ">
          <ThemeButton />
        </span>
      </div>
      {/* <Navbar links={links} username={""} logout={false} /> */}
      {children}
    </>
  )
}
