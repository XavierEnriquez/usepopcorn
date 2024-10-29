import { useEffect, useRef } from "react";

export default function Search({ query, onSetQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      inputEl.current.focus();
      function callback(e) {
        if (document.activeElement === inputEl.current) return;
        if (e.code === "Enter") {
          inputEl.current.focus();
          onSetQuery("");
        }
      }
      document.addEventListener("keydown", callback);

      return () => document.addEventListener("keydown", callback);
    },
    [onSetQuery]
  );
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
