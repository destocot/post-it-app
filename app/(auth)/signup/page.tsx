"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data: userExists, error: userError } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (userExists) {
      setSubmitting(false);
      return toast.error("Username already taken");
    }

    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })

    if (signupError) {
      setSubmitting(false);
      toast.error(signupError.message);
    }

    const { data, error } = await supabase.from("profiles")
      .insert({ id: signupData.user?.id, username });

    // console.log(data, error);

    router.push("verify");
  };

  return (
    <main className="flex justify-center items-center h-screen my-0">
      <div className="w-1/2">
        <Toaster />
        <h1 className="uppercase text-3xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 font-bold w-fit mx-auto dark:border-dark-four dark:bg-dark-five/50">Signup</h1>
        <form onSubmit={handleSubmit} className="w-full mx-auto p-4 border text-lg bg-light-four rounded-md shadow-xl dark:bg-dark-two">
          <label className=" flex justify-between items-center my-1">
            Username: <input className="shadow w-3/4 p-2 my-1 dark:text-dark-one" type="text" name="username" required defaultValue="zatch55"
              placeholder="Enter your username" />
          </label>
          <label className="my-1 flex justify-between items-center">
            Email: <input className="shadow w-3/4 p-2 my-1 dark:text-dark-one" type="email" name="email" required defaultValue="zatchbelltestingsuite@gmail.com"
              placeholder="Enter your email" />
          </label>
          <label className="flex justify-between items-center my-1">
            Password: <input className="shadow w-3/4 p-2 my-1 dark:text-dark-one" type="password" name="password" required defaultValue="zatch123"
              placeholder="Enter your password" />
          </label>
          <button disabled={submitting} type="submit" className="shadow my-2 block mx-auto py-2 px-10 hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five">Signup</button>
          <span className="flex justify-center">Already a member? Login <Link className="ml-1 underline underline-offset-4 inline-block font-semibold hover:text-light-two" href="/login">here</Link></span>
        </form>
      </div>
    </main>
  )
}