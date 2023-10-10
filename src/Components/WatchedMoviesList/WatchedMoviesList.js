import WatchedMovies from "./WatchedMovies";

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovies movie={movie} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
