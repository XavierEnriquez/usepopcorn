import { useState, useEffect } from "react";
import { KEY } from "../utils/KEY";
import Loader from "../utils/Loader";
import StarRating from "../utils/StarRating";

export default function MovieDetails({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        if (!res.ok) throw new Error("Something went wrong!");

        const data = await res.json();
        setMovie(data);
      }

      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClickCapture={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${movie} movie poster`} />
            <div className="details-overview">
              {" "}
              <h2>{title}</h2>{" "}
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={24} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
