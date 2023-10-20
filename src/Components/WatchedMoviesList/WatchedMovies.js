import React from "react";
import ImgNotAvailabe from '../../assets/image_not_available.png'
function WatchedMovies({ movie, setWatched, watched }) {
  const handleDelete = (id) => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  };

  
  return (
    <li>
      {movie.poster !== "N/A" ? <img src={movie.poster} alt={`${movie.title} poster`} /> : <img src={ImgNotAvailabe} alt="" />}
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating || "N/A"}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating || 0}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime || 0} min</span>
        </p>

        <button className="btn-delete" onClick={() => handleDelete(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}

export default WatchedMovies;
