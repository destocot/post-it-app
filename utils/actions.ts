"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData) => {
  const title = formData.get("title") || "untitled";
  const content = formData.get("content");
  const isPrivate = formData.get("private") || false;
  const color = formData.get("color") || "purple";

  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/landing");
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      content,
      private: isPrivate,
      user_id: session?.user.id,
      color,
    })
    .select("id")
    .single();

  if (data) {
    revalidatePath("/");
    redirect(`/posts/${data.id}`);
  }
};

export const updatePost = async (formData: FormData) => {
  const title = formData.get("title") || "untitled";
  const content = formData.get("content");
  const isPrivate = formData.get("private") || false;
  const color = formData.get("color") || "purple";
  const postId = formData.get("postId");

  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/landing");
  }

  const { data, error } = await supabase
    .from("posts")
    .update({
      title,
      content,
      private: isPrivate,
      color,
    })
    .eq("id", postId)
    .select()
    .single();

  if (data) {
    revalidatePath("/");
    redirect(`/posts/${data.id}`);
  }
};
