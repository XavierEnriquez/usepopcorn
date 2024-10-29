import { useState } from "react";

import { useFetchMovies } from "./hooks.js/useFetchMovies";

import WatchedMovieList from "./movies-watched/WatchedMovieList";
import WatchedSummaryCard from "./movies-watched/WatchedSummaryCard";
import ContentBlock from "./utils/ContentBlock";
import NavBar from "./navbar/NavBar";
import Logo from "./navbar/Logo";
import Search from "./navbar/Search";
import NumResults from "./navbar/NumResults";
import MovieDetails from "./movies/MovieDetails";
import SearchResultsBlock from "./movies/SearchResultsBlock";
import { useLocalStorageState } from "./hooks.js/useLocalStorageState";

function Main({ children }) {
  return <main className="main">{children}</main>;
}

/*App-v2 -- refactored react hooks into custom hooks -- hooks.js --  */
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useFetchMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imbdID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <SearchResultsBlock
          isLoading={isLoading}
          error={error}
          movies={movies}
          handleSelectMovie={handleSelectMovie}
        />

        <ContentBlock>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummaryCard watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </ContentBlock>
      </Main>
    </>
  );
}
