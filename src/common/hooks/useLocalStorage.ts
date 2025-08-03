import { useState } from 'react';

export function useLocalStorage(): [string, (search: string) => void] {
  const [savedSearch, setValue] = useState(
    localStorage.getItem('searchString') || ''
  );

  const setSavedSearch = (searchString: string) => {
    localStorage.setItem('searchString', searchString);
    setValue(searchString);
  };
  return [savedSearch, setSavedSearch];
}
