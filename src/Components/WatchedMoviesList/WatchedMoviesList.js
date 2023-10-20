import WatchedMovies from "./WatchedMovies";

function WatchedMoviesList({ watched, setWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovies movie={movie} key={movie.imdbID} watched={watched} setWatched={setWatched} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
