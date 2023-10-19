import React, { useEffect, useState } from 'react'
import StarRating from '../StarRating/StarRating';

const KEY = "812f6a2";

const MovieDetails = ({ selectedId, setSelectedId }) => {

    const [movie, setMovie] = useState({});
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
    function handleCloseDetails() {
        setSelectedId(null)
    }

    const getMovieDetails = async () => {
        try {
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
            );
            if (!res.ok) {
                throw new Error("Something went wrong with fetching movies");
            }
            const data = await res.json();
            setMovie(data);
            if (data.Response === "False") {
                throw new Error("Movie Not Found");
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        if (selectedId !== null) {
            getMovieDetails();
        }
    }, [selectedId])
    return (
        <div className="details">

            <header>
                <button className="btn-back" onClick={handleCloseDetails}>
                    &larr;
                </button>
                <img src={poster} alt={`Poster of ${movie} movie`} />
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>
                        <span>⭐️</span>
                        {imdbRating} IMDb rating
                    </p>
                </div>
            </header>
            <section>
                <div className="rating">

                    <>
                        <StarRating
                            maxRating={10}
                            size={24}
                            // onSetRating={setUserRating}
                        />
                        {/* {userRating > 0 && (
                            <button className="btn-add" onClick={handleAdd}>
                                + Add to list
                            </button>
                        )} */}
                    </>
                    ) : (
                    <p>
                        You rated with movie  <span>⭐️</span>
                    </p>
                    )
                </div>
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>



        </div>
    )
}

export default MovieDetails