"use client"

import Link from "next/link";
import { useState } from "react"
import { FaHome, FaHouseUser, FaRegPlusSquare, FaWindowClose } from "react-icons/fa";

export default function Hamburger() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      <div onClick={() => setMobileNav(!mobileNav)} className="space-y-1 absolute top-6 right-16 md:hidden z-20">
        <div className="w-6 h-0.5 bg-light-one"></div>
        <div className="w-6 h-0.5 bg-light-one"></div>
        <div className="w-6 h-0.5 bg-light-one"></div>
      </div>
      {mobileNav && <div className="absolute z-20 h-screen top-0 left-0 w-1/3 p-4 dark:bg-dark-two/80">
        <ul className="md:hidden space-y-5">
          <button className="text-xl hover:text-2xl" onClick={() => setMobileNav(false)}><FaWindowClose /></button>
          <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/"><FaHome /> Home</Link>
          <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/profile"><FaHouseUser /> Profile</Link>
          <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/posts/create"><FaRegPlusSquare /> New Post</Link>
        </ul>
      </div>}
    </>
  )
}