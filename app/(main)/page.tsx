import PostList from "@/components/PostList";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <main>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1
          className="uppercase text-xl md:text-2xl my-4 md:my-0 mx-auto mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          Check out the most recent posts
        </h1>
        <SearchForm previousValue="" />
      </div>
      <PostList />
    </main>
  )
}
