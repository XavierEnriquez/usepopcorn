import WatchedMovieItem from "./WatchedMovieItem";

export default function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem
          movie={movie}
          key={movie.imbdID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
