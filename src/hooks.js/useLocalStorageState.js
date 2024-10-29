import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, storageKey) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem(storageKey, JSON.stringify(value));
    },
    [value, storageKey]
  );

  return [value, setValue];
}
