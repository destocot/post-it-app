import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createPost } from '@/utils/actions'
import SelectColor from './SelectColor'
import SubmitButton from './SubmitButton'

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
      <h1 className="mt-8 uppercase text-3xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50  font-bold w-fit mx-auto">create a new stick-it!</h1>
      <form id="create-post-form" action={createPost} className="w-3/4 md:w-1/2 aspect-square mx-auto bg-purple-one text-black flex flex-col border border-light-four dark:border-dark-four">
        <input
          id="create-post-title"
          className="w-full block outline-none bg-purple-two text-white p-4"
          type="text"
          name="title"
          placeholder="Title (optional)"
        />
        <textarea
          id="create-post-content"
          className="w-full block outline-none bg-purple-one flex-1 p-4"
          name="content"
          placeholder="Post"
          required
        >
        </textarea>
        <div className="flex flex-wrap items-center gap-2 px-4 py-3">
          <p className="font-bold">- {name}</p>
          <label className="flex items-center gap-2">Private?<input type="checkbox" name="private" value="true" /></label>
          <SelectColor color="purple" />
          <SubmitButton />
        </div>
      </form>
    </main >
  )
}