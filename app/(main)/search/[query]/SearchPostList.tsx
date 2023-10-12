"use client"
import Post from '@/components/Post';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/types/database.types";
import { useEffect, useState } from "react";
import { PostType } from "@/types/types";

export default function SearchPostList({ query }: { query: string }) {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const getSearchedPosts = async () => {
      const supabase = createClientComponentClient<Database>();
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*, profiles (name)')
        .textSearch('content', query)

      if (posts) { setPosts(posts) }
    }
    getSearchedPosts();
  }, [query])

  return (
    <>
      <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-3 grid-cols-2 lg:p-0 px-2">
        {(posts.length !== 0) && posts.map((post) =>
          <Post key={post.id} post={post} backTo="home" />
        )}
        {(posts.length === 0) && <h1 className="col-span-4 mx-auto uppercase text-3xl px-2 py-1 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          No Posts Found
        </h1>}
      </div>
    </>
  )
}