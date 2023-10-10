"use client"
import { PostType } from "@/types/types";
import SelectColor from "../create/SelectColor";
import { SetStateAction } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types"
import { useRouter } from "next/navigation";

export default function EditForm({ post, setEditMode }: { post: PostType, setEditMode: React.Dispatch<SetStateAction<boolean>> }) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const isPrivate = formData.get("private") ? true : false;
    const color = formData.get("color") as string;

    const supabase = createClientComponentClient<Database>()
    const { data, error } = await supabase
      .from("posts")
      .update({ title, content, color, private: isPrivate })
      .eq('id', post.id)
      .select()
      .single();

    if (data) {
      router.refresh();
      setEditMode(false);
    }
  };

  let display;
  if (post.profiles) {
    display = post.profiles.username || post.profiles.name;
  }

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-black/50 z-10">
      <div className="w-full h-full flex justify-center items-center">
        <form id="create-post-form" onSubmit={handleSubmit} className="lg:w-2/5 bg-purple-one text-black flex flex-col border shadow-lg">
          <input
            id="create-post-title"
            className="w-full block outline-none bg-purple-two text-white p-4"
            type="text"
            name="title"
            defaultValue={post.title || ""}
          />
          <textarea
            id="create-post-content"
            className="w-full block outline-none bg-purple-one flex-1 p-4"
            name="content"
            defaultValue={post.content}
            required
          >
          </textarea>
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 px-4 py-3">
            <p className="font-bold">- {display}</p>
            <label className="flex items-center gap-2">Private?<input defaultChecked={(post.private) ? true : false} type="checkbox" name="private" value="true" /></label>
            <SelectColor color={post.color} />
            <div className="flex gap-5 ml-auto">
              <button
                className="ml-auto py-2 px-4 rounded-md shadow transition-all bg-light-one  text-light-five dark:bg-dark-two dark:text-dark-four  hover:scale-110" type="button" onClick={() => setEditMode(false)}>Close</button>
              <button
                id="create-post-button"
                className="ml-auto py-1 px-2 rounded-md shadow transition-all bg-purple-two hover:scale-110 text-white" type="submit">Edit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}