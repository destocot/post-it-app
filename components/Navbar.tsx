import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { FaHome, FaRegStickyNote, FaHouseUser, FaRegPlusSquare, FaRegUserCircle } from "react-icons/fa";
import ThemeButton from "./ThemeButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "📋 Profile" },
  { href: "/posts/create", label: "🆕 New Post" },
]

export default function Navbar({ username, logout }: { username: string, logout: boolean }) {
  return (
    <>
      <header>
        <nav className="flex justify-between items-end border-b-2 pb-1 text-lg">
          <Link href="/">
            <h1 className="uppercase text-3xl -skew-x-6 font-semibold w-fit mx-auto flex items-center gap-2">stick-it! <FaRegStickyNote /></h1>
          </Link>
          <ul className="flex gap-x-5">
            <Link className="flex items-center gap-1" href="/"><FaHome /> Home</Link>
            <Link className="flex items-center gap-1" href="/profile"><FaHouseUser /> Profile</Link>
            <Link className="flex items-center gap-1" href="/posts/create"><FaRegPlusSquare /> New Post</Link>
          </ul>
          <div className="flex gap-x-4">
            {username && <h2 className="text-2lg font-bold flex gap-1 items-center"><FaRegUserCircle /> Welcome, {username}</h2>}
            {logout && <LogoutButton />}
            <ThemeButton />
          </div>
        </nav>
      </header>
    </>
  )
}