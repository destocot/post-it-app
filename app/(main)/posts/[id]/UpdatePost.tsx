import { Database } from "@/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RiPushpinLine, RiUnpinLine } from "react-icons/ri";


export default function UpdatePost({ postId, pinned }: { postId: string, pinned: boolean }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const updatePost = async () => {
    setUpdating(true);

    const supabase = createClientComponentClient<Database>()
    const { data } = await supabase
      .from("posts")
      .update({ pinned: !pinned })
      .eq('id', postId)
      .select()
      .single();

    const message = `post has been ${(pinned) ? "unpinned" : "pinned"}`
    if (data) {
      toast.success(message)
      router.refresh();
    }

    setUpdating(false);
  }

  return (
    <>
      <Toaster />
      <button disabled={updating} onClick={() => updatePost()} className="shadow dark:border-dark-three border my-2 py-2 px-8 hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five dark:bg-dark-two dark:text-dark-three dark:hover:text-dark-two dark:hover:bg-dark-three">
        {(pinned) && <RiUnpinLine className="text-xl md:text-2xl lg:text-3xl" />}
        {(!pinned) && <RiPushpinLine className="text-xl md:text-2xl lg:text-3xl" />}
      </button>
    </>
  )
}

