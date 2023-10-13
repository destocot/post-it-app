import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { FaHome, FaRegStickyNote, FaHouseUser, FaRegPlusSquare } from "react-icons/fa";
import Image from "next/image";
import Hamburger from "./Hamburger";
import ThemeButton from "./ThemeButton";

export default async function Navbar({ display, avatar }: { display: string | null, avatar: string | null }) {
  return (
    <>
      <header>
        <ThemeButton />
        <nav className="flex flex-wrap justify-between items-end border-b pb-1 text-lg px-2">
          <Link href="/">
            <h1 className="uppercase text-5xl -skew-x-6 font-semibold w-fit mx-auto flex items-center gap-2">stick-it! <FaRegStickyNote /></h1>
          </Link>
          <ul className="md:flex gap-x-5 hidden">
            <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/"><FaHome /> Home</Link>
            <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/profile"><FaHouseUser /> Profile</Link>
            <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/posts/create"><FaRegPlusSquare /> New Post</Link>
          </ul>
          <Hamburger />
          <div className="flex gap-2 items-end">
            {display && <h2 className="whitespace-nowrap font-bold flex gap-2 items-center"><Image src={`${avatar}`} alt=""
              width={25} height={25} className="bg-default-profile max-w-[25px] aspect-square border-2 object-cover rounded-full border-light-five dark:border-dark-five" />Welcome, <Link href="/profile" className="underline-offset-4 hover:underline">{display}</Link></h2>}
            <LogoutButton />
          </div>
        </nav>
      </header>
    </>
  )
}