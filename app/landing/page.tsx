import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function LandingPage() {
  // redirect user if they have a session (logged in)
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  if (data.session) {
    redirect('/')
  }

  return (
    <main className="h-screen flex justify-center items-center my-0">
      <div>
        <h1>Post-It!</h1>
        <Image src="https://picsum.photos/id/8/300" alt="" width={300} height={300} />
        <Link href="/login">login</Link>
        <Link href="/signup">signup</Link>
      </div>
    </main>
  )
}