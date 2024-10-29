import { useRef } from "react";
import { useKeydown } from "../hooks.js/useKeydown";

export default function Search({ query, onSetQuery }) {
  const inputEl = useRef(null);

  useKeydown("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    onSetQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
