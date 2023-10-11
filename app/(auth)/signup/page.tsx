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

  const [signupData, setSignupData] = useState({
    name: "daisy",
    email: "daisy@example.com",
    password: "daisy123",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!signupData.name) {
      setSubmitting(false);
      return toast.error("Please enter a username.");
    }

    if (!signupData.email) {
      setSubmitting(false);
      return toast.error("Please enter an email.");
    }

    if (!signupData.password) {
      setSubmitting(false);
      return toast.error("Please enter a password.");
    }

    const { count: userExists } = await supabase
      .from("profiles")
      .select('*', { count: 'exact', head: true })
      .eq("name", signupData.name)

    if (userExists) {
      setSubmitting(false);
      return toast.error("Username already taken");
    }

    //  upload image
    const formData = new FormData();
    let json;
    if (avatarFile) {
      formData.append("file", avatarFile);
      formData.append("upload_preset", "wmleukdy");

      const data = await fetch("https://api.cloudinary.com/v1_1/detsfgack/image/upload", {
        method: "POST",
        body: formData
      })

      json = await data.json();
    }

    // signup user
    const { email, password, name } = signupData;
    const avatar_url = (json) ? json.secure_url : `https://ui-avatars.com/api/?size=200&name=${name}`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
        data: {
          name,
          avatar_url
        }
      },
    })

    if (error) {
      setSubmitting(false);
      toast.error(error.message);
    }

    router.push("verify");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAvatarFile(files[0]);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen my-0">
      <div className="w-1/2">
        <Toaster />
        <h1 className="uppercase text-3xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 font-bold w-fit mx-auto dark:border-dark-four dark:bg-dark-five/50">Signup</h1>
        <form onSubmit={handleSubmit} className="w-full mx-auto p-4 border text-lg bg-light-four rounded-md shadow-xl dark:bg-dark-two">
          <label className=" flex justify-between items-center my-1">
            Username: <input className="shadow w-3/4 p-2 my-1 dark:text-dark-one" type="text" name="name" required
              placeholder="Enter your username" value={signupData.name || ""} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} />
          </label>
          <label className="my-1 flex justify-between items-center">
            Email: <input className="shadow w-3/4 p-2 my-1 dark:text-dark-one" type="email" name="email" required
              placeholder="Enter your email" value={signupData.email || ""} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
          </label>
          <label className="flex justify-between items-center my-1">
            Password: <input className="shadow w-3/4 p-2 my-1 dark:text-dark-one" type="password" name="password" required
              placeholder="Enter your password" value={signupData.password || ""} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
          </label>
          <label className="flex justify-between items-center my-1">
            Avatar: <input className="shadow w-3/4 p-2 my-1 dark:text-dark-four" type="file" name="file"
              accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} />
          </label>
          <button disabled={submitting} type="submit" className="shadow my-2 block mx-auto py-2 px-10 hover:scale-110 font-bold hover:text-light-three rounded-md transition-all bg-light-three hover:bg-light-five text-light-five">Signup</button>
          <span className="flex justify-center">Already a member? Login <Link className="ml-1 underline underline-offset-4 inline-block font-semibold hover:text-light-two" href="/login">here</Link></span>
        </form>
      </div>
    </main>
  )
}