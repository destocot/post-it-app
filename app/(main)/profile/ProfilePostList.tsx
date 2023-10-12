import Post from '@/components/Post';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from "@/types/database.types";
import Loading from '@/components/Loading';

const getUnpinnedPosts = async (userId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  // const { data: { user } } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select('*, profiles (name)')
    .eq("user_id", userId)
    .eq("pinned", false)
    .order('created_at', { ascending: false })

  return posts;
}

export async function ProfilePostList({ userId }: { userId: string }) {
  const posts = await getUnpinnedPosts(userId);

  const shadow = (posts && posts.length > 8) ? true : false;

  return (
    <>
      <h1 className="uppercase mx-auto text-3xl mt-6 mb-4 px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
        Your posts
      </h1>
      <div className={`grid lg:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:p-0 max-h-1/2 ${shadow ? "overflow-y-scroll no-scrollbar" : ""} px-2`}>
        {(posts && !!posts.length) ? posts.map((post) =>
          <Post key={post.id} post={post} backTo="profile" />
        ) : <h1 className="col-span-4 mx-auto">no posts yet, click new post to make your first!</h1>}
        {(!posts) && <Loading />}
        {(shadow) && <div className="hidden md:block col-span-4 py-24"></div>}
      </div>
    </>
  )
}

const getPosts = async (userId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  // const { data: { user } } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select('*, profiles (name)')
    .eq("user_id", userId)
    .eq("pinned", true)
    .order('created_at', { ascending: false })

  return posts;
}


export async function PinnedPosts({ userId }: { userId: string }) {
  const posts = await getPosts(userId);

  const shadow = (posts && posts.length > 8) ? true : false;

  return (
    <>
      {(posts && !!posts.length) && <h1 className="uppercase mx-auto text-3xl mt-6 mb-4 px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
        Pinned Posts
      </h1>}
      <div className={`grid lg:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:p-0 max-h-1/2 ${shadow ? "overflow-y-scroll no-scrollbar" : ""} px-2`}>
        {(posts) && posts.map((post) =>
          <Post key={post.id} post={post} backTo="profile" />
        )}
        {(!posts) && <Loading />}
        {(shadow) && <div className="col-span-4 py-24"></div>}
      </div>
    </>
  )
}