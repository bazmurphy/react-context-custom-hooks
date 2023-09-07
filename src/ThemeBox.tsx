import { useTheme } from "./ThemeContext";

export function ThemeBox() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>
        Theme: {theme === "light" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
