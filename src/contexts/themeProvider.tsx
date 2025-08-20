'use client';
import React, { useEffect } from 'react';
import { useLocalStorage } from '../common/hooks/useLocalStorage';
import { ThemeContext } from './themeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme, isHydrated] = useLocalStorage('theme', 'light');

  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme, isHydrated]);

  const toggleTheme = () => {
    setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
