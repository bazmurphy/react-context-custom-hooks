import { usePokemon } from "./Store";

export function SearchBox() {
  // call the custom hook
  const { search, setSearch } = usePokemon();

  return (
    <div>
      <input
        className="mt-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-800 sm:text-lg p-2"
        placeholder="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}
