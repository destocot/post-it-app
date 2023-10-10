// import Navbar from "@/components/Navbar"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from "next/link"
import { FaRegStickyNote } from 'react-icons/fa'

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
      <div className="z-10 absolute text-3xl top-4 left-4">
        <Link href="/landing" className="hover:text-4xl"><FaRegStickyNote /></Link>
      </div>
      {children}
    </>
  )
}
