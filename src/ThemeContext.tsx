import { createContext, useContext, useState } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// createContext give it an initial value, and it gives you a .Provider
// and you wrap the components that want to consume that Context with the Provider
export const ThemeContext = createContext({
  theme: "light",
} as ThemeContextType);

export function useTheme() {
  return useContext(ThemeContext)!;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
