const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(2);
const minWatched = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur, 0).toFixed(2);

export default function WatchedSummaryCard({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const minutesWatched = minWatched(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Your watched movies stats</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{minutesWatched} min</span>
        </p>
      </div>
    </div>
  );
}
