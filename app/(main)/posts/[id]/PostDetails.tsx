import { PostType } from "@/types/types";
import Link from "next/link";
import { BiLock } from "react-icons/bi";

export default function PostDetails({ post }: { post: PostType }) {
  let baseBackgroundColor;
  let titleBackgroundColor;
  let foldBorderColor;

  switch (post.color) {
    case "purple":
      baseBackgroundColor = "bg-purple-one";
      titleBackgroundColor = "bg-purple-two";
      foldBorderColor = "hover:before:border-x-purple-two"
      break;
    case "blue":
      baseBackgroundColor = "bg-blue-one";
      titleBackgroundColor = "bg-blue-two";
      foldBorderColor = "hover:before:border-x-blue-two"
      break;
    case "green":
      baseBackgroundColor = "bg-green-one";
      titleBackgroundColor = "bg-green-two";
      foldBorderColor = "hover:before:border-x-green-two"
      break;
    case "yellow":
      baseBackgroundColor = "bg-yellow-one";
      titleBackgroundColor = "bg-yellow-two";
      foldBorderColor = "hover:before:border-x-yellow-two"
      break;
    case "red":
      baseBackgroundColor = "bg-red-one";
      titleBackgroundColor = "bg-red-two";
      foldBorderColor = "hover:before:border-x-red-two"
      break;
    default:
      baseBackgroundColor = "bg-purple-one";
      titleBackgroundColor = "bg-purple-two";
      foldBorderColor = "hover:before:border-x-purple-two"
      break;
  }

  let display;
  if (post.profiles) {
    display = post.profiles.name;
  }

  return (
    <div className={`w-3/5 hover:rotate-2 shadow-xl mx-auto aspect-square ${baseBackgroundColor} text-black rounded-md flex flex-col bigfold ${foldBorderColor} text-lg`}>
      <div className={`flex ${titleBackgroundColor} text-light-one p-4`}>
        <p className="font-semibold">{post.title}</p>
        <span className="ml-auto flex items-center text-2xl">{(post.private) && <BiLock />}</span>
      </div>
      <p className="m-auto px-4">{post.content}</p>
      <div className="text-xl self-start flex gap-1 px-4">
        <Link href={`/profile/view/${display}`} className="font-bold">- {display}</Link>
        <p>{new Date(post.created_at).toLocaleDateString('en-US', { month: '2-digit', day: 'numeric', year: '2-digit' })}</p>
      </div>
    </div>
  )
}