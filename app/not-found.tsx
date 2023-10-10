import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <Image
        className="not-found__img"
        src="https://images.unsplash.com/photo-1543615294-40348f9cf5df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80"
        alt="giraffe photo"
        fill={true}
        loading="lazy"
      />
      <div className="flex flex-col absolute top-10 right-20 gap-4 text-dark-two">
        <h2 className="text-5xl">Page not found!</h2>
        <button className="text-4xl">Click <Link className=" underline underline-offset-4 hover:text-[peru]" href="/">here</Link> to go back</button>
      </div>
    </main>
  );
}
