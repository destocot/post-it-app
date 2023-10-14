import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { FaHome, FaRegStickyNote, FaHouseUser, FaRegPlusSquare } from "react-icons/fa";
import Image from "next/image";
import Hamburger from "./Hamburger";

export default async function Navbar({ display, avatar }: { display: string | null, avatar: string | null }) {
  return (
    <>
      <header>
        <nav className="flex flex-wrap justify-between items-end md:border-b-2 pb-4 md:pb-2 text-lg px-2 bg-light-one dark:bg-dark-one md:bg-transparent">
          <Link href="/">
            <h1 className="mb-1 uppercase text-5xl -skew-x-6 font-semibold w-fit mx-auto flex items-center gap-2">stick-it! <FaRegStickyNote /></h1>
          </Link>
          <ul className="md:flex gap-x-5 hidden">
            <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/"><FaHome /> Home</Link>
            <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/profile"><FaHouseUser /> Profile</Link>
            <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/posts/create"><FaRegPlusSquare /> New Post</Link>
          </ul>
          <Hamburger />
          <div className="flex gap-2 items-end">
            {display && <div className="flex items-end gap-2">
              <Image src={`${avatar}`} alt=""
                width={30} height={30} className="bg-default-profile max-w-[30px] aspect-square border-2 object-cover rounded-full border-light-five dark:border-dark-five" />
              <h2 className="whitespace-nowrap font-bold">Welcome, <Link href="/profile" className="underline-offset-4 hover:underline">{display}</Link></h2>
            </div>
            }
            <LogoutButton />
          </div>
        </nav>
      </header>
    </>
  )
}