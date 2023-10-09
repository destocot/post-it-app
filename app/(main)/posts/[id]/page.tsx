import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const getPost = async (postId: string) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: post, error } = await supabase
    .from("posts")
    .select('*, profiles (username)')
    .eq("id", postId)
    .single();

  return post;
};

export default async function page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <main>
      <div className="w-2/3 cursor-pointer mx-auto aspect-square bg-light-three text-black shadow-md rounded-sm flex flex-col fold">
        <p>{JSON.stringify(post, null, 2)}</p>
      </div>
    </main>
  )
}