import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import PostList from "@/components/PostList";
import { redirect } from "next/navigation";
import { Database } from "@/types/database.types";
import ProfileSettings from "./ProfileSettings";
import Image from "next/image";
import { FaRegStickyNote } from "react-icons/fa";

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

  let display = null;
  let theme = null;
  let avatar = null;
  if (user) {
    display = user.name;
    theme = user.dark_mode;
    avatar = user.avatar_url;
  }

  const { count: numOfPosts, error } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq("user_id", userId);

  return (
    <main>
      <div className="flex gap-5 items-end p-2">
        <Image src={`${avatar}`} alt=""
          width={200} height={200} className="max-w-[200px] aspect-square shadow-md border-2 object-cover rounded-full border-light-five dark:border-dark-five" />
        <h1 className="uppercase text-3xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          {display}&apos;s profile
        </h1>
        <h1 className="uppercase text-3xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit flex items-center gap-1">
          {numOfPosts} <FaRegStickyNote />
        </h1>
        <h1 className="text-4xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold hover:bg-light-four dark:hover:bg-dark-five flex items-center ml-auto">
          <ProfileSettings display={display} />
        </h1>
      </div>
      <h1 className="uppercase text-3xl mt-6 mb-4 px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
        Your posts
      </h1>
      {userId && <PostList userId={userId} backTo="profile" />}
    </main>
  );
}