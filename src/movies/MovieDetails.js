import { useState, useEffect } from "react";
import { KEY } from "../utils/KEY";
import Loader from "../utils/Loader";
import StarRating from "../utils/StarRating";
import ErrorMessage from "../utils/ErrorMessage";
import { useKeydown } from "../hooks.js/useKeydown";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

  const isWatched = watched?.map((movie) => movie.imbdID).includes(selectedId);
  const watchedUserRating = watched?.find(
    (movie) => movie.imbdID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddMovie() {
    const newWatchedMovie = {
      imbdID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKeydown("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok) throw new Error("Something went wrong!");

          const data = await res.json();
          setMovie(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      getMovieDetails();
    },
    // this useEffect monitors for any selectedId change, it then runs the function in it.
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;

      // this useEffect function dynamically changes the page title
      document.title = ` ${title} | usePopcorn`;

      // we use a clean-up function to return to the original state
      return function () {
        document.title = "usePopcorn";
      };
    },
    // this useEffect monitors for any title change, it then runs the function in it.
    [title]
  );

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClickCapture={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} movie poster`} />
            <div className="details-overview">
              {" "}
              <h2>{title}</h2>{" "}
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      + Add to watched list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie 🌟 {watchedUserRating} </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
