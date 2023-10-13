import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound, redirect } from 'next/navigation';
import SelectColor from '../../create/SelectColor';
import SubmitButton from '../../create/SubmitButton';
import { updatePost } from '@/utils/actions';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Stick-It! | Edit Post',
}

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

  const { data: { user } } = await supabase.auth.getUser();
  if (user === null || user.id !== post.user_id) {
    redirect(`/posts/${postId}`)
  }

  return post;
};


export default async function EditPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  let display;
  if (post.profiles) {
    display = post.profiles.name;
  }

  return (
    <main>
      <div className="flex justify-between items-center mb-5">
        <h1
          className="uppercase text-2xl mx-auto mt-6 mb-4 px-8 py-2 -skew-x-6 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit ">
          Editing Post
        </h1>
        <Link href={`/posts/${post.id}`} className="mx-auto shadow my-2 py-2 px-8 hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five dark:bg-dark-two dark:text-dark-three dark:hover:text-dark-two dark:hover:bg-dark-three border"><BiArrowBack className="text-3xl" /></Link>
      </div>
      <form id="create-post-form" action={updatePost} className="text-lg w-full mx-auto bg-purple-one text-black flex flex-col border border-light-four dark:border-dark-four">
        <input type="hidden" name="postId" value={post.id} />
        <input
          id="create-post-title"
          className="w-full block outline-none bg-purple-two font-semibold p-4"
          type="text"
          name="title"
          defaultValue={post.title}
        />
        <textarea
          id="create-post-content"
          className="w-full block outline-none bg-purple-one p-4"
          name="content"
          required
          defaultValue={post.content}
          rows={Math.ceil(post.content.length / 100)}
        >
        </textarea>
        <div className="flex flex-wrap items-center gap-2 px-4 py-3">
          <p className="font-bold">- {display}</p>
          <label className="flex items-center gap-2">Private?<input type="checkbox" className="cursor-pointer scale-125 hover:scale-150" name="private" value="true" defaultChecked={(post.private) ? true : false} /></label>
          <SelectColor color={post.color} />
          <SubmitButton />
        </div>
      </form>
    </main>
  )
}