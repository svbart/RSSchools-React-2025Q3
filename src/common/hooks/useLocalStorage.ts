// import { useState } from 'react';

// export function useLocalStorage(): [string, (search: string) => void] {
//   const [savedSearch, setValue] = useState(
//     localStorage.getItem('searchString') || ''
//   );

//   const setSavedSearch = (searchString: string) => {
//     localStorage.setItem('searchString', searchString);
//     setValue(searchString || '');
//   };
//   return [savedSearch, setSavedSearch];
// }
'use client';
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          setValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
      }
      setIsHydrated(true);
    }
  }, [key]);

  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue, isHydrated] as const;
}
