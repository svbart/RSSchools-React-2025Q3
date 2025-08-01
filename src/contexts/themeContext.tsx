import React, { createContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        console.error('Failed to save theme to localStorage:', error);
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
