import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar({ links, username, logout }: { links: { href: string, label: string }[], username: string, logout: boolean }) {
  return (
    <>
      <header>
        <nav className="flex justify-between border-b-2 pb-2">
          <div className="flex gap-5">
            <h1>Post-It! 🗒️</h1>
          </div>
          {username && <div>👤 {username}</div>}
          <ul className="flex gap-5">
            {links.map((link) => (<Link key={link.href} href={link.href}>{link.label}</Link>))}
            {logout && <LogoutButton />}
          </ul>
        </nav>
      </header>
    </>
  )
}