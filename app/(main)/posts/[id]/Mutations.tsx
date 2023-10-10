"use client"
import { PostType } from '@/types/types';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiTrashAlt, BiEdit, BiArrowBack } from "react-icons/bi";
import EditForm from './EditForm';
import DeletePost from './DeletePost';

export default function Mutations({ post, userId }: { post: PostType, userId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnRoute = (searchParams.get("return") === "profile") ? "/profile" : "/";

  const [editMode, setEditMode] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  return (
    <>
      <div className="flex gap-5">
        {(post.user_id === userId) && <button onClick={() => setEditMode(true)} className="shadow my-2 py-3 px-10 hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five dark:bg-dark-two dark:text-dark-three dark:hover:text-dark-two dark:hover:bg-dark-three"><BiEdit className="text-3xl" /></button>}
        {(post.user_id === userId) && <button onClick={() => setDeleteConfirmation(true)} className="shadow my-2 py-3 px-10 hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five dark:bg-dark-two dark:text-dark-three dark:hover:text-dark-two dark:hover:bg-dark-three"><BiTrashAlt className="text-3xl" /></button>}
        <button onClick={() => router.push(returnRoute)} className="shadow my-2 py-3 px-10 hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five dark:bg-dark-two dark:text-dark-three dark:hover:text-dark-two dark:hover:bg-dark-three"><BiArrowBack className="text-3xl" /></button>
      </div>
      {editMode && <EditForm post={post} setEditMode={setEditMode} />}
      {deleteConfirmation && <DeletePost setDeleteConfirmation={setDeleteConfirmation} postId={post.id} returnRoute={returnRoute} />}
    </>
  )
}