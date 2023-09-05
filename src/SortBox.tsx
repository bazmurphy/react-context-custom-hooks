import { usePokemon } from "./Store";

export function SortBox() {
  // call the custom hook
  const { sort, setSort } = usePokemon();

  return (
    <div className="py-2">
      <label>Sort: </label>
      <select value={sort} onChange={(event) => setSort(event.target.value)}>
        <option value="numberASC"># ASC</option>
        <option value="numberDESC"># DESC</option>
        <option value="nameASC">A-Z</option>
        <option value="nameDESC">Z-A</option>
      </select>
    </div>
  );
}
