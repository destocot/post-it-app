import Navbar from "@/components/Navbar"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

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

  const { data, error } = await supabase.from("profiles")
    .select("username")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <Navbar username={data.username} logout={true} />
      {children}
      <footer className="flex justify-center items-center py-4 h-12">
        <p>
          Khurram Ali - Stick-It! - &copy; 2023
        </p>
      </footer>
    </>
  )
}
