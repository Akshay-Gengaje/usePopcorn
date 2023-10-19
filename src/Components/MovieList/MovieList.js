
import Movie from "../Movie/Movie";

function MovieList({ movies, setSelectedId, selectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} setSelectedId={setSelectedId} selectedId={selectedId} />
      ))}
    </ul>
  );
}

export default MovieList;
