"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa"

export default function SearchForm({ previousValue }: { previousValue: string }) {
  const [query, setQuery] = useState(previousValue);
  const router = useRouter();

  const handleSearch = () => {
    if (query.length >= 3) {
      router.push(`/search/${query}`)
    } else {
      toast("Please enter 3 or more characters", {
        icon: "⚠️"
      });
    }
  }

  return (
    <div className="self-start border-2 ">
      <Toaster />
      <label className="flex items-center dark:bg-dark-two">
        <input className="focus:bg-dark-four bg-light-one outline-none py-2 px-3 dark:bg-dark-two dark:focus:bg-light-five dark:text-dark-four" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a post..." onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }} />
        <FaSearch className="mx-3 text-lg text-light-four  hover:scale-110" onClick={() => handleSearch()} />
      </label>
    </div>
  )
}