import WatchedMovieItem from "./utils/WatchedMovieItem";

export default function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
