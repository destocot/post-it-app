"use client"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiTrashAlt, BiEdit, BiArrowBack } from "react-icons/bi";
import DeletePost from './DeletePost';
import UpdatePost from './UpdatePost';
import { PostType } from '@/app/types/types';

export default function Mutations({ post, userId }: { post: PostType, userId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnRoute = (searchParams.get("return") === "profile") ? "/profile" : "/";

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  return (
    <>
      <div className="flex gap-5 mx-auto">
        {(post.user_id === userId) &&
          <>
            <UpdatePost postId={post.id} pinned={post.pinned} />
            <button onClick={() =>
              router.push(`/posts/${post.id}/edit`)
            } className="shadow dark:border-dark-three border my-2 py-2 px-8 hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five dark:bg-dark-two dark:text-dark-three dark:hover:text-dark-two dark:hover:bg-dark-three"><BiEdit className="text-xl md:text-2xl lg:text-3xl" /></button>
            <button onClick={() => setDeleteConfirmation(true)} className="shadow dark:border-dark-three border my-2 py-2 px-8 hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five dark:bg-dark-two dark:text-dark-three dark:hover:text-dark-two dark:hover:bg-dark-three"><BiTrashAlt className="text-xl md:text-2xl lg:text-3xl" /></button>
          </>}
        <button onClick={() => router.push(returnRoute)} className="shadow dark:border-dark-three border my-2 py-2 px-8 hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five dark:bg-dark-two dark:text-dark-three dark:hover:text-dark-two dark:hover:bg-dark-three"><BiArrowBack className="text-xl md:text-2xl lg:text-3xl" /></button>
      </div>
      {deleteConfirmation && <DeletePost setDeleteConfirmation={setDeleteConfirmation} postId={post.id} returnRoute={returnRoute} />}
    </>
  )
}