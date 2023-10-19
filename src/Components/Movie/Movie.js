import React from "react";
import noImage from '../../assets/image_not_available.png'
function Movie({ movie, setSelectedId, selectedId }) {
  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id)
  }
  return (
    <li onClick={() => handleSelectMovie(movie.imdbID)}>
      {movie.Poster !== "N/A" ? <img src={movie.Poster} alt={`${movie.Title} poster`} /> : <img src={noImage} alt="" style={{ background: "rgba(0,0,0,0.20)" }} />}
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
