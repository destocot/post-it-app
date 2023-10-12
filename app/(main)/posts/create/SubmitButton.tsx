"use client"
import { usePathname, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SubmitButton() {
  const [disabled, setDisabled] = useState(false);

  const clickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    new Promise(() => setTimeout(() => setDisabled(true), 100));
    new Promise(() => setTimeout(() => setDisabled(false), 5000));
  }

  const pathname = usePathname();
  const endPath = pathname.split("/").pop();
  useEffect(() => {
    if (endPath === "edit") {
      toast("editing ✏️")
    } else if (endPath === "create") {
      toast("creating ✏️")
    }
  }, [endPath])

  return (
    <>
      <Toaster />
      <button
        id="create-post-button"
        className="ml-auto py-1 px-2 rounded-md transition-all bg-purple-two hover:scale-110 text-white" disabled={disabled} onClick={(e) => clickHandler(e)} type="submit">Submit</button>
    </>
  )
}