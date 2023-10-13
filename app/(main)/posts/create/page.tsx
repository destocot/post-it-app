import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createPost } from '@/utils/actions'
import SelectColor from './SelectColor'
import SubmitButton from './SubmitButton'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Stick-It! | Create Post',
}

export default async function CreatePostPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/landing')
  }

  const userId = session.user.id;
  const { data: { name }, error } = await supabase.from("profiles")
    .select()
    .eq("id", userId)
    .single();


  return (
    <main>
      <h1 className="mt-12 md:mt-8 uppercase text-3xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50  font-bold w-fit mx-auto">create a new stick-it!</h1>
      <form id="create-post-form" action={createPost} className="w-[90vw] md:w-1/2 aspect-square mx-auto bg-purple-one text-black flex flex-col border border-light-four dark:border-dark-four">
        <input
          id="create-post-title"
          className="w-full block outline-none bg-purple-two text-dark-one p-4 placeholder:text-dark-one/50"
          type="text"
          name="title"
          placeholder="Title (optional)"
        />
        <textarea
          id="create-post-content"
          className="w-full block outline-none bg-purple-one text-dark-one flex-1 p-4 placeholder:text-dark-one/50"
          name="content"
          placeholder="Post"
          required
        >
        </textarea>
        <div className="flex flex-wrap items-center gap-2 px-4 py-3">
          <p className="font-bold">- {name}</p>
          <label className="flex items-center gap-2">Private?<input type="checkbox" className="scale-125 hover:scale-150 cursor-pointer" name="private" value="true" /></label>
          <SelectColor color="purple" />
          <SubmitButton />
        </div>
      </form>
    </main >
  )
}