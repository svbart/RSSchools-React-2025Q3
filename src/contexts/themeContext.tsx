import { createContext } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
