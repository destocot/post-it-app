import Post from "./Post";
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { PostType } from "@/types/types";

const getPosts = async (userId: string | null) => {
  const supabase = createServerComponentClient({ cookies });
  // const { data: { user } } = await supabase.auth.getUser();

  // if (!user) {
  //   return [];
  // }
  let posts;

  if (userId) {
    const { data, error } = await supabase
      .from("posts")
      .select('*, profiles (username)')
      .eq("user_id", userId)
      .order('created_at', { ascending: false })

    posts = data;
  } else {
    const { data, error } = await supabase
      .from("posts")
      .select('*, profiles (username)')
      .eq("private", false)
      .order('created_at', { ascending: false })

    posts = data;
  }

  return posts;
}

export default async function PostList({ userId }: { userId: string | null }) {
  const posts: PostType[] = await getPosts(userId) || [];

  return (
    <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:p-0 px-2">
      {posts.map((post) =>
        <Post key={post.id} post={post} />
      )}
    </div>
  )
}