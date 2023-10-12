import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { Database } from "@/types/database.types";
import Image from "next/image";
import { FaRegStickyNote } from "react-icons/fa";
import ProfileSettings from "../../ProfileSettings";
import { PinnedPosts, ProfilePostList } from "../../ProfilePostList";

const getUserInfo = async (username: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  username = username.replaceAll("%20", " ");
  const { data: user, error } = await supabase
    .from("profiles")
    .select()
    .eq("name", username)
    .single();

  if (!user) {
    notFound();
  }

  return user;
};

const getNumOfPosts = async (userId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { count: numOfPosts, error } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq("user_id", userId);

  return numOfPosts;
}

const getOwnershipStatus = async (userId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies }); const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user.id === userId;
};


export default async function ViewProfilePage({ params }: { params: { name: string } }) {
  const userInfo = await getUserInfo(params.name);
  const userId = userInfo.id;
  const ownsProfile = await getOwnershipStatus(userId);
  const numOfPosts = await getNumOfPosts(userId);

  return (
    <main>
      <div className="flex gap-5 items-end p-2 bg-profile-banner">
        <Image src={`${userInfo.avatar_url}`} alt=""
          width={200} height={200} className="max-w-[175px] mx-2 my-1 aspect-square shadow-md border-2 object-cover rounded-full border-light-five dark:border-dark-five" />
        <h1 className="uppercase text-3xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          {userInfo.name}&apos;s profile
        </h1>
        <h1 className="uppercase text-3xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit flex items-center gap-1">
          {numOfPosts} <FaRegStickyNote />
        </h1>
        {ownsProfile && <h1 className="text-4xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold hover:bg-light-four dark:hover:bg-dark-five flex items-center ml-auto">
          <ProfileSettings display={userInfo.name} />
        </h1>}
      </div>
      {userId && <PinnedPosts userId={userId} />}
      <h1 className="uppercase text-3xl mt-6 mb-4 px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
        posts
      </h1>
      {userId && <ProfilePostList userId={userId} />}
    </main>
  );
}
