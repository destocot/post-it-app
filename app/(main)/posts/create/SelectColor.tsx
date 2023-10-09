"use client"

import { ChangeEvent, useEffect, useState } from "react";
import resolveConfig from 'tailwindcss/resolveConfig'
import myConfig from '@/tailwind.config'

export default function SelectColor() {
  // const createPostForm = document.getElementById("create-post-form");
  const tailwindConfig = resolveConfig(myConfig)
  const colors = tailwindConfig.theme?.colors!;

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    const createPostForm = document.getElementById("create-post-form")!;
    const createPostTitle = document.getElementById("create-post-title")!;
    const createPostContent = document.getElementById("create-post-content")!;
    const createPostButton = document.getElementById("create-post-button")!;
    switch (e.target.value) {
      case "blue":
        createPostForm.style.backgroundColor = colors["blue-one"] as string;
        createPostTitle.style.backgroundColor = colors["blue-two"] as string;
        createPostContent.style.backgroundColor = colors["blue-one"] as string;
        createPostButton.style.backgroundColor = colors["blue-two"] as string;
        break;
      case "green":
        createPostForm.style.backgroundColor = colors["green-one"] as string;
        createPostTitle.style.backgroundColor = colors["green-two"] as string;
        createPostContent.style.backgroundColor = colors["green-one"] as string;
        createPostButton.style.backgroundColor = colors["green-two"] as string;
        break;
      case "yellow":
        createPostForm.style.backgroundColor = colors["yellow-one"] as string;
        createPostTitle.style.backgroundColor = colors["yellow-two"] as string;
        createPostContent.style.backgroundColor = colors["yellow-one"] as string;
        createPostButton.style.backgroundColor = colors["yellow-two"] as string;
        break;
      case "red":
        createPostForm.style.backgroundColor = colors["red-one"] as string;
        createPostTitle.style.backgroundColor = colors["red-two"] as string;
        createPostContent.style.backgroundColor = colors["red-one"] as string;
        createPostButton.style.backgroundColor = colors["red-two"] as string;
        break;
      default:
        createPostForm.style.backgroundColor = colors["purple-one"] as string;
        createPostTitle.style.backgroundColor = colors["purple-two"] as string;
        createPostContent.style.backgroundColor = colors["purple-one"] as string;
        createPostButton.style.backgroundColor = colors["purple-two"] as string;
        break;
    }
  }

  return (
    <label className="flex items-center gap-2">Color?
      <select name="color" onChange={(e) => changeHandler(e)}>
        <option value="purple">Purple</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="red">Red</option>
      </select>
    </label>
  )
}