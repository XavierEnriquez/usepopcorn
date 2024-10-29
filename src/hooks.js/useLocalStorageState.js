import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, storageKey) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(storageKey);
    return JSON.parse(storedValue);
  });
  useEffect(
    function () {
      localStorage.setItem(storageKey, JSON.stringify(value));
    },
    [value, storageKey]
  );

  return [value, setValue];
}
