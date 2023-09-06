import {
  useReducer,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

// a custom hook - the source hook that has the data in it
function usePokemonSource(): {
  pokemon: Pokemon[];
  search: string;
  setSearch: (search: string) => void;
  sort: string;
  setSort: (sort: string) => void;
} {
  // instead of using state here, we can try to use a reducer
  // const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  // const [search, setSearch] = useState("");

  // we need to define types for the state and the reducer function
  type PokemonState = {
    pokemon: Pokemon[];
    search: string;
    sort: string;
  };

  type PokemonActions =
    | {
        type: "setPokemon";
        payload: Pokemon[];
      }
    | { type: "setSearch"; payload: string }
    | { type: "setSort"; payload: string };

  const [{ pokemon, search, sort }, dispatch] = useReducer(
    (state: PokemonState, action: PokemonActions) => {
      switch (action.type) {
        case "setPokemon":
          return { ...state, pokemon: action.payload };
        case "setSearch":
          return { ...state, search: action.payload };
        case "setSort":
          return { ...state, sort: action.payload };
      }
    },
    {
      pokemon: [],
      search: "",
      sort: "numberASC",
    }
  );

  useEffect(() => {
    fetch("/pokemon.json")
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: "setPokemon",
          payload: data,
        })
      );
  }, []);

  // we should always use useCallback in a custom hook when you are returning a function
  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }, []);

  const setSort = useCallback((sort: string) => {
    // console.log("setSort", sort);
    dispatch({
      type: "setSort",
      payload: sort,
    });
  }, []);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemon, search]);

  const sortedPokemon = useMemo(() => {
    switch (sort) {
      case "numberASC":
        return [...filteredPokemon].sort((a, b) => a.id - b.id);
      case "numberDESC":
        return [...filteredPokemon].sort((a, b) => b.id - a.id);
      case "nameASC":
        return [...filteredPokemon].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      case "nameDESC":
        return [...filteredPokemon].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      default:
        return [...filteredPokemon];
    }
  }, [filteredPokemon, sort]);

  return { pokemon: sortedPokemon, search, setSearch, sort, setSort };
}

const PokemonContext = createContext<
  ReturnType<typeof usePokemonSource> | undefined
>(undefined);

// this is a custom hook wrapper for the Context
export function usePokemon() {
  // the ! tells TypeScript hey it will always be not undefined
  return useContext(PokemonContext)!;
}

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
}
