import { PostType } from "@/types/types";
import Link from "next/link";

export default function PostDetails({ post }: { post: PostType }) {
  const postColors = getPostColors(post.color);
  let baseBackgroundColor = postColors.baseBackgroundColor;
  let titleBackgroundColor = postColors.titleBackgroundColor;

  let display;
  if (post.profiles) {
    display = post.profiles.name;
  }

  return (
    <form id="create-post-form" className={`text-lg w-full mx-auto text-black flex flex-col border border-light-four dark:border-dark-four ${baseBackgroundColor}`}>
      <input
        id="create-post-title"
        className={`w-full block outline-none text-white p-4 ${titleBackgroundColor}`}
        type="text"
        defaultValue={post.title || ""}
        disabled
      />
      <textarea
        id="create-post-content"
        className={`w-full block outline-none flex-1 p-4 ${baseBackgroundColor}`}
        defaultValue={post.content}
        disabled
      >
      </textarea>
      <div className="flex items-center gap-2 px-4 py-4">
        <Link href={`/profile/view/${display}`} className="font-semibold hover:underline underline-offset-4">- {display}</Link>
        <p>{new Date(post.created_at).toLocaleDateString('en-US', { month: '2-digit', day: 'numeric', year: '2-digit' })}</p>
      </div>
    </form>
  )
}


const getPostColors = (color: string) => {
  let baseBackgroundColor;
  let titleBackgroundColor;
  let foldBorderColor;

  switch (color) {
    case "purple":
      baseBackgroundColor = "bg-purple-one";
      titleBackgroundColor = "bg-purple-two";
      foldBorderColor = "hover:before:border-x-purple-two";
      break;
    case "blue":
      baseBackgroundColor = "bg-blue-one";
      titleBackgroundColor = "bg-blue-two";
      foldBorderColor = "hover:before:border-x-blue-two";
      break;
    case "green":
      baseBackgroundColor = "bg-green-one";
      titleBackgroundColor = "bg-green-two";
      foldBorderColor = "hover:before:border-x-green-two";
      break;
    case "yellow":
      baseBackgroundColor = "bg-yellow-one";
      titleBackgroundColor = "bg-yellow-two";
      foldBorderColor = "hover:before:border-x-yellow-two";
      break;
    case "red":
      baseBackgroundColor = "bg-red-one";
      titleBackgroundColor = "bg-red-two";
      foldBorderColor = "hover:before:border-x-red-two";
      break;
    default:
      baseBackgroundColor = "bg-purple-one";
      titleBackgroundColor = "bg-purple-two";
      foldBorderColor = "hover:before:border-x-purple-two";
      break;
  }

  return { baseBackgroundColor, titleBackgroundColor, foldBorderColor };
};
