import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound, redirect } from 'next/navigation';
import Mutations from './Mutations';
import PostDetails from './PostDetails';

const getPost = async (postId: string) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: post, error } = await supabase
    .from("posts")
    .select('*, profiles (name)')
    .eq("id", postId)
    .single();

  if (error) {
    notFound();
  }

  return post;
};

const getUserId = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/landing')
  }

  return session.user.id;
}

export default async function page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const userId = await getUserId();

  return (
    <main>
      <div className="flex flex-wrap justify-between items-center mb-5">
        <h1
          className="uppercase text-2xl mt-6 mb-4 mx-auto px-8 py-2 -skew-x-6 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          Post Details
        </h1>
        <Mutations post={post} userId={userId} />
      </div>
      <PostDetails post={post} />
    </main>
  )
}