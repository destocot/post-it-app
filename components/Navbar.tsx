import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { FaHome, FaRegStickyNote, FaHouseUser, FaRegPlusSquare } from "react-icons/fa";
import Image from "next/image";

export default async function Navbar({ display, avatar }: { display: string | null, avatar: string | null }) {
  return (
    <>
      <header>
        <nav className="flex justify-between items-end border-b pb-1 text-lg">
          <Link href="/">
            <h1 className="uppercase text-3xl -skew-x-6 font-semibold w-fit mx-auto flex items-center gap-2">stick-it! <FaRegStickyNote /></h1>
          </Link>
          <ul className="flex gap-x-5">
            <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/"><FaHome /> Home</Link>
            <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/profile"><FaHouseUser /> Profile</Link>
            <Link className="hover:underline underline-offset-4 transition-all flex items-center gap-1" href="/posts/create"><FaRegPlusSquare /> New Post</Link>
          </ul>
          <div className="flex gap-2 items-end">
            {display && <h2 className="text-2lg font-bold flex gap-2 items-center"><Image src={`${avatar}`} alt=""
              width={25} height={25} className="max-w-[25px] aspect-square border-2 object-cover rounded-full border-light-five dark:border-dark-five" />Welcome, {display}</h2>}
            <LogoutButton />
          </div>
        </nav>
      </header>
    </>
  )
}