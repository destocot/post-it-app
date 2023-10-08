"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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
      router.push("/");
    }
  };

  return (
    <main>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit}>
        <label>
          Email: <input type="text" name="email" defaultValue="zatchbelltestingsuite@gmail.com" />
        </label>
        <label>
          Password: <input type="text" name="password" defaultValue="zatch123" />
        </label>
        <button type="submit">
          Login
        </button>
      </form>
    </main>
  )
}