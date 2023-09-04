import { PokemonProvider } from "./Store";
import { useTheme } from "./ThemeContext";

import { ThemeBox } from "./ThemeBox";
import { SearchBox } from "./SearchBox";
import { SortBox } from "./SortBox";
import { PokemonList } from "./PokemonList";

import "./App.css";

function App() {
  // call the custom hook and get the pokemon array
  // const { pokemon } = usePokemon();
  // pass that pokemon array into the PokemonList component

  // call the custom hook
  const { theme } = useTheme();

  return (
    // you wrap the Components you want to consume that context in the .Provider
    <PokemonProvider>
      <div className={`${theme} mx-auto max-w-3xl p-4`}>
        <div className="flex items-center gap-4">
          <SearchBox />
          <SortBox />
          <ThemeBox />
        </div>
        <PokemonList />
      </div>
    </PokemonProvider>
  );
}

export default App;
