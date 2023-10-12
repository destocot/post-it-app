import SearchForm from "@/components/SearchForm";
import SearchPostList from "./SearchPostList";

export default function SearchPage({ params }: { params: { query: string } }) {
  return (
    <main>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1
          className="uppercase text-xl md:text-2xl my-4 md:my-0 mx-auto mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 dark:border-dark-four dark:bg-dark-five/50 font-bold w-fit">
          Search Posts
        </h1>
        <SearchForm previousValue={params.query} />
      </div>
      <SearchPostList query={params.query} />
    </main>
  )
}