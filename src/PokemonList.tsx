import { usePokemon } from "./Store";

export function PokemonList() {
  // call the custom hook
  const { pokemon } = usePokemon();

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-3">
        {pokemon.map((p) => (
          <li
            key={p.id}
            className="col-span-1 flex flex-col text-center rounded-lg shadow divide-y bg-white bg-opacity-25"
          >
            <div className="flex-1 flex flex-col p-8">
              <img
                className="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                alt=""
              />
              <h3 className="mt-6 text-sm font-medium">
                #{p.id} {p.name}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
