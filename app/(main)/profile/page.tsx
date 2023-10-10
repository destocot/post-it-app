import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import PostList from "@/components/PostList";
import { redirect } from "next/navigation";
import { Database } from "@/types/database.types";
import ProfileSettings from "./ProfileSettings";

export default async function ProfilePage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/landing')
  }

  const userId = session?.user.id;
  const {
    data: user,
  } = await supabase.from("profiles").select().eq("id", userId).single();

  let display;
  let theme;
  if (user) {
    display = user.username || user.name;
    theme = user.dark_mode;
  }

  return (
    <main>
      <div className="flex justify-around">
        <h1 className="uppercase text-xl mb-4 px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          {display}&apos;s profile
        </h1>
        <h1 className="uppercase text-xl mb-4 px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          {session?.user.email}
        </h1>
        <h1 className="uppercase text-xl mb-4 px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          color theme: {theme ? "dark" : "light"}
        </h1>
        <h1 className="flex items-center text-3xl mb-4 px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold hover:bg-light-four dark:hover:bg-dark-five">
          <ProfileSettings display={display} />
        </h1>
      </div>
      <h1 className="uppercase text-3xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
        Your posts
      </h1>
      {userId && <PostList userId={userId} backTo="profile" />}
    </main>
  );
}
