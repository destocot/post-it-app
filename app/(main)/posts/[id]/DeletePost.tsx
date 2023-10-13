"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Database } from "@/app/types/database.types";

export default function DeletePost({ setDeleteConfirmation, postId, returnRoute }: { setDeleteConfirmation: Dispatch<SetStateAction<boolean>>, postId: string, returnRoute: string }) {
  const router = useRouter();

  const deletePost = async () => {
    const supabase = createClientComponentClient<Database>()
    const { data } = await supabase
      .from("posts")
      .delete()
      .eq('id', postId)
      .select()
      .single();

    if (data) {
      router.refresh();
      router.push(returnRoute);
    }
  }

  return (
    <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
      <div className="absolute bg-black/50 opacity-80 inset-0 z-0"></div>
      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  dark:bg-dark-two bg-light-two ">
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
            <p className="text-sm text-gray-500 px-8">Do you really want to delete this post?
              This process cannot be undone</p>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button onClick={() => setDeleteConfirmation(false)} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
              Close
            </button>
            <button onClick={() => deletePost()} className="mb-2 md:mb-0 bg-light-five border border-light-two px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-dark-two">Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}