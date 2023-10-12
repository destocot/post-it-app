"use client"
import { MouseEvent, useState } from "react";

export default function SubmitButton() {
  const [disabled, setDisabled] = useState(false);

  const clickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    new Promise(() => setTimeout(() => setDisabled(true), 100));
    new Promise(() => setTimeout(() => setDisabled(false), 5000));
  }

  return (
    <button
      id="create-post-button"
      className="ml-auto py-1 px-2 rounded-md transition-all bg-purple-two hover:scale-110 text-white" disabled={disabled} onClick={(e) => clickHandler(e)} type="submit">Submit</button>
  )
}