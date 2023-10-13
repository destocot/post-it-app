"use client"
import Post from "./Post";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { PostType } from "@/app/types/types";
import { Database } from "@/app/types/database.types";


export default function PostList() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState<number>(2);

  // subscription
  useEffect(() => {
    const supabase = createClientComponentClient<Database>();
    const channel = supabase
      .channel("schema-db-changes")
      .on("postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
          filter: "private=eq.false"
        },
        (payload: { new: PostType }) => {
          if (page === 1) {
            setPosts([payload.new, ...posts])
          }
        }
      )
      .subscribe();
  }, [posts, page])

  useEffect(() => {
    const getPosts = async () => {
      const supabase = createClientComponentClient<Database>();

      const { data: posts } = await supabase
        .from("posts")
        .select('*, profiles (name)')
        .eq("private", false)
        .order('created_at', { ascending: false })
        .range((page * 12 - 12), (page * 12 - 1));


      if (posts && posts.length) {
        setPosts(posts);
      } else {
        setPage(1);
      }
    }
    getPosts();
  }, [page])

  return (
    <>
      {(posts.length >= 12) && <button onClick={() => {
        setPosts([]);
        setTimeout(() =>
          setPage(state => state + 1), 10);
      }} className="mx-auto shadow px-5 mb-3 text-2xl hover:scale-105 font-bold hover:text-light-three rounded-md transition-all bg-light-three/70 hover:bg-light-five text-light-five flex items-center dark:text-dark-four dark:bg-dark-two dark:border-2 dark:border-dark-three dark:hover:bg-dark-four dark:hover:text-dark-two">SHOW MORE POSTS</button>}
      {((posts.length < 12) && (posts.length > 0) || posts.length === 0) && <button onClick={() => {
        setPosts([]);
        setPage(page + 1);
        setTimeout(() => setPage(1), 10);
      }} className="mx-auto shadow px-5 mb-3 text-2xl hover:scale-105 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five flex items-center dark:text-dark-four dark:bg-dark-two dark:border-2 dark:border-dark-three dark:hover:bg-dark-four dark:hover:text-dark-two">CHECK FOR NEW POSTS</button>}
      <div className="grid lg:grid-cols-4 gap-y-2 md:gap-2 md:grid-cols-3 grid-cols-2 lg:p-0 md:px-2">
        {(posts.length !== 0) && posts.map((post) =>
          <Post key={post.id} post={post} backTo="home" />
        )}
        {(posts.length === 0) && <Loading />}
      </div>
    </>
  )
}