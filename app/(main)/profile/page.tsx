import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import ProfileSettings from "./ProfileSettings";
import Image from "next/image";
import { FaRegPlusSquare, FaRegStickyNote } from "react-icons/fa";
import { ProfilePostList, PinnedPosts } from "./ProfilePostList";
import Link from "next/link";
import { Metadata } from "next";
import { Database } from "@/app/types/database.types";

export const metadata: Metadata = {
  title: 'Stick-It! | Profile',
}

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
      <div className="flex flex-wrap gap-5 mt-6 items-end p-2 bg-profile-banner">
        <Image src={`${avatar}`} alt="profile image"
          width={250} height={250} className="max-w-[100px] bg-default-profile md:max-w-[175px] mx-2 my-1 aspect-square shadow-md border-2 object-cover rounded-full border-light-five dark:border-dark-five" />
        <h1 className="uppercase text-2xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          {display}&apos;s profile
        </h1>
        <h1 className="uppercase text-2xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit flex items-center gap-1">
          {numOfPosts} <FaRegStickyNote />
        </h1>
        <div className="ml-auto flex gap-2">
          <h1 className="text-4xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold hover:bg-light-four dark:hover:bg-dark-five flex items-center">
            <Link href="/posts/create"><FaRegPlusSquare /></Link>
          </h1>
          <h1 className="text-4xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold hover:bg-light-four dark:hover:bg-dark-five flex items-center">
            <ProfileSettings display={display} />
          </h1>
        </div>
      </div>
      {userId && <PinnedPosts userId={userId} />}
      {userId && <ProfilePostList userId={userId} />}
    </main>
  );
}