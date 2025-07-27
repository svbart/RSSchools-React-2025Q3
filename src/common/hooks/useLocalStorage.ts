import { useState } from 'react';

export function useLocalStorage(): [string, (search: string) => void] {
  const [savedSearch, setValue] = useState(
    localStorage.getItem('searchValue') || ''
  );

  const setSavedSearch = (searchString: string) => {
    localStorage.setItem('searchValue', searchString);
    setValue(searchString);
  };
  return [savedSearch, setSavedSearch];
}
