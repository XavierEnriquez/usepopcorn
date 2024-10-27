import { useEffect, useState } from "react";

import WatchedMovieList from "./movies-watched/WatchedMovieList";
import WatchedSummaryCard from "./movies-watched/WatchedSummaryCard";
import MoviesList from "./movies/MoviesList";
import ContentBlock from "./utils/ContentBlock";
import NavBar from "./navbar/NavBar";
import Logo from "./navbar/Logo";
import Search from "./navbar/Search";
import NumResults from "./navbar/NumResults";
import ErrorMessage from "./utils/ErrorMessage";
import Loader from "./utils/Loader";
import MovieDetails from "./movies/MovieDetails";
import { KEY } from "./utils/KEY";

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function SearchResultsBlock({ isLoading, error, movies, handleSelectMovie }) {
  return (
    <ContentBlock>
      {/* Passing components implicitly with children props **preferd way in react** */}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
      )}
      {error && <ErrorMessage message={error} />}
    </ContentBlock>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong!");

          const data = await res.json();

          if (data.Response === "False") setMovies([]);
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

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
