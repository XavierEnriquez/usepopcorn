import MoviesList from "./MoviesList";
import ContentBlock from "../utils/ContentBlock";
import ErrorMessage from "../utils/ErrorMessage";
import Loader from "../utils/Loader";

export default function SearchResultsBlock({
  isLoading,
  error,
  movies,
  handleSelectMovie,
}) {
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
