import { PostType } from "@/types/types";
import { BiLock } from "react-icons/bi";
import Link from "next/link";

export default function Post({ post, backTo }: { post: PostType, backTo: string }) {
  const postColors = getPostColors(post.color);
  let baseBackgroundColor = postColors.baseBackgroundColor;
  let titleBackgroundColor = postColors.titleBackgroundColor;
  let foldBorderColor = postColors.foldBorderColor;

  let display;
  if (post.profiles) {
    display = post.profiles.name;
  }

  return (
    <Link href={{ pathname: `/posts/${post.id}`, query: { return: backTo } }}>
      <div className={`hover:rotate-1 shadow-lg cursor-pointer m-1 aspect-square ${baseBackgroundColor} text-black rounded-sm flex flex-col fold ${foldBorderColor} w-5/6 mx-auto`}>
        <div className={`flex ${titleBackgroundColor} text-light-one p-2`}>
          <p className="font-semibold whitespace-nowrap truncate">{post.title}</p>
          <span className="ml-auto flex items-center text-lg">{(post.private) && <BiLock />}</span>
        </div>
        <p className="m-auto text-center px-2">{(post.content.length < 140) ? post.content : post.content.slice(0, 140) + "..."}</p>
        <div className="self-start flex gap-1 text-sm px-2">
          <p className="font-semibold">- {display}</p>
          <p>{new Date(post.created_at).toLocaleDateString('en-US', { month: '2-digit', day: 'numeric', year: '2-digit' })}</p>
        </div>
      </div>
    </Link >
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
