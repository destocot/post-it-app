import Navbar from "@/components/Navbar"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "../../types/database.types"
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
    .select("name, id, avatar_url, dark_mode")
    .eq("id", userId)
    .single();

  if (error) {
    await supabase.auth.signOut();
  }

  let display = null;
  let avatar = null;
  let theme = false;
  if (user) {
    display = user.name;
    avatar = user.avatar_url;
    theme = user.dark_mode;
  }

  return (
    <>
      <ThemeButton />
      <Navbar display={display} avatar={avatar} />
      {children}
      <footer className="bg-light-three text-black dark:bg-dark-one dark:text-dark-four py-4 mt-4">
        <div className="container mx-auto flex justify-center items-center">
          <p className="text-sm">
            &copy; 2023 Stick-It! | Khurram Ali
          </p>
        </div>
      </footer>

    </>
  )
}
