import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createPost } from '@/utils/actions'
import SelectColor from './SelectColor'

export default async function CreatePostPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/landing')
  }

  let displayName = session.user.user_metadata.full_name;

  const userId = session.user.id;
  const { data: { username }, error } = await supabase.from("profiles")
    .select()
    .eq("id", userId)
    .single();

  if (username) {
    displayName = username;
  }

  return (
    <main>
      <h1 className="uppercase text-3xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50  font-bold w-fit mx-auto">create a new stick-it!</h1>
      <form id="create-post-form" action={createPost} className="w-1/2 aspect-square mx-auto bg-purple-one text-black flex flex-col border border-light-four dark:border-dark-four">
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
        <div className="flex items-center gap-2 px-4 py-3">
          <p className="font-bold">- {displayName}</p>
          <label className="flex items-center gap-2">Private?<input type="checkbox" name="private" value="true" /></label>
          <SelectColor color="purple" />
          <button
            id="create-post-button"
            className="ml-auto py-1 px-2 rounded-md transition-all bg-purple-two hover:scale-110 text-white" type="submit">Submit</button>
        </div>
      </form>
    </main >
  )
}