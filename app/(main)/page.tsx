import PostList from "@/components/PostList";

export default function Home() {
  return (
    <main>
      <h1
        className="uppercase text-3xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit mx-auto">
        Check out the most recent posts
      </h1>
      <PostList userId={null} />
    </main>
  )
}
