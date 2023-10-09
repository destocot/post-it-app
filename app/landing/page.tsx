import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import Image from "next/image";
import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import LandingVisual from "@/components/LandingVisual";

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
        <h1 className="uppercase text-8xl bg-light-three/75 -skew-x-6 font-bold w-fit mx-auto mb-2 px-4 dark:border-dark-four dark:bg-dark-five/50">stick-it!</h1>
        {/* <Image src="https://picsum.photos/id/8/300" alt="" width={300} height={300} /> */}
        <LandingVisual />
        <div className="flex flex-col items-center">
          <Link className="shadow mb-2 py-2 px-20 text-xl hover:scale-125 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five" href="/login">Login</Link>
          <span>Not a member? Sign up <Link className="underline underline-offset-4 inline-block font-semibold hover:text-light-five" href="/signup">here</Link></span>
        </div>
      </div>
    </main>
  )
}