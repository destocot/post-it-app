import { PostType } from "@/types/types";
import Link from "next/link";

export default function GreenPost({ post }: { post: PostType }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="hover:rotate-1 sshadow-lg cursor-pointer m-1 aspect-square bg-green-one text-black rounded-sm flex flex-col fold  hover:before:border-x-green-two">
        <div className="flex bg-green-two text-light-one p-2">
          <p className="font-semibold whitespace-nowrap truncate">{post.title}</p>
          <span className="ml-auto">{(post.private) && "🔒"}</span>
        </div>
        <p className="m-auto px-2">{(post.content.length < 140) ? post.content : post.content.slice(0, 140) + "..."}</p>
        <div className="self-start flex gap-1 text-sm px-2">
          <p className="font-bold">- {post.profiles.username}</p>
          <p>{new Date(post.created_at).toLocaleDateString('en-US', { month: '2-digit', day: 'numeric', year: '2-digit' })}</p>
        </div>
      </div>
    </Link >
  )
}