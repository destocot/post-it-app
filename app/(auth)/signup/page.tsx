"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const signup = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })

    const signupData = signup.data;
    const signupError = signup.error;

    const { data, error } = await supabase.from("profiles")
      .insert({ id: signupData.user?.id, username });

    router.push("verify");
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input type="text" name="username" defaultValue="zatch55" />
        </label>
        <label>
          Email: <input type="text" name="email" defaultValue="zatchbelltestingsuite@gmail.com" />
        </label>
        <label>
          Password: <input type="text" name="password" defaultValue="zatch123" />
        </label>
        <button type="submit">
          Submit
        </button>
      </form>
    </main>
  )
}