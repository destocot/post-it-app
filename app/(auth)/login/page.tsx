"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import GoogleLogin from "../landing/GoogleLogin";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message);
    }

    if (!error) {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <main className="flex justify-center items-center h-screen my-0">
      <div className="w-1/2">
        <Toaster />
        <h1 className="uppercase text-3xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 font-bold w-fit mx-auto dark:border-dark-four dark:bg-dark-five/50">Login</h1>
        <form onSubmit={handleSubmit} className="w-full mx-auto p-4 border text-lg bg-light-four/50 rounded-md shadow-xl">
          <label className="flex flex-col  md:flex-row justify-between items-center my-1">
            Email: <input className="w-3/4 p-2 my-1 dark:text-dark-one" type="email" name="email" required
              placeholder="Enter your email" />
          </label>
          <label className="flex flex-col  md:flex-row justify-between items-center my-1">
            Password: <input className="w-3/4 p-2 my-1 dark:text-dark-one" type="password" name="password"
              placeholder="Enter your password" />
          </label>
          <div className="flex items-end">
            <button type="submit" className="shadow my-2 block mx-auto py-2 px-10 hover:scale-110  font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five">Login</button>
            <GoogleLogin />
          </div>
          <span className="text-sm">Not a member? Sign up <Link className="ml-1 underline underline-offset-4 inline-block font-semibold hover:text-light-two" href="/signup">here</Link></span>
        </form>
      </div>
    </main>
  )
}