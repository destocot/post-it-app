import SearchForm from "@/components/SearchForm";
import SearchPostList from "./SearchPostList";

export default function SearchPage({ params }: { params: { query: string } }) {
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1
          className="uppercase text-3xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          Search Posts
        </h1>
        <SearchForm previousValue={params.query} />
      </div>
      <SearchPostList query={params.query} />
    </main>
  )
}