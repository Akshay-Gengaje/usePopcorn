import React, { useEffect, useRef, useState } from 'react'
import StarRating from '../StarRating/StarRating';
import imageNotAvailable from '../../assets/image_not_available.png'
import Loader from '../Loader/Loader';
import { useKey } from '../../hooks/useKey';
const KEY = "812f6a2";

const MovieDetails = ({ selectedId, setSelectedId, onAddWatched, watched }) => {

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('');
    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;
    const countRef = useRef(0);

    useEffect(() => {
        if (userRating)
            countRef.current = countRef.current + 1
    }, [userRating])
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
            setIsLoading(true)
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
            );
            if (!res.ok) {
                throw new Error("Something went wrong with fetching movies");
            }
            const data = await res.json();
            setMovie(data);
            setIsLoading(false)
            if (data.Response === "False") {
                throw new Error("Movie Not Found");
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleAdd = () => {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: NaN ? "" : Number(imdbRating),
            runtime: NaN ? "" : Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDecisions: countRef.current
        };
        handleAddWatched(newWatchedMovie);
        handleCloseDetails();
    }


    function handleAddWatched(movie) {
        onAddWatched((watched) => [...watched, movie]);

    }
    useEffect(() => {
        if (selectedId !== null) {
            getMovieDetails();
        }
    }, [selectedId])

    useEffect(() => {
        if (!title) return;
        document.title = `MOVIE | ${title}`

        return () => {
            document.title = "usePopCorn"
        }
    }, [title])

    useKey("Escape", handleCloseDetails)




    return (
        <div className="details">
            {isLoading ? <Loader /> : <>
                <header>
                    <button className="btn-back" onClick={handleCloseDetails}>
                        &larr;
                    </button>
                    {poster !== "N/A" ? <img src={poster} alt={`Poster of ${movie} movie`} /> : <img src={imageNotAvailable} alt="" style={{ backgroundPosition: "center" }} />}
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

                        {!isWatched ? <>
                            <StarRating
                                maxRating={10}
                                size={24}
                                onSetRating={setUserRating}
                            />

                            {userRating > 0 && <button className="btn-add" onClick={handleAdd}>
                                + Add to list
                            </button>}

                        </> : <p>You rated with movie <span style={{ fontWeight: "800" }}>{watchedUserRating}⭐</span></p>}

                    </div>
                    <p>
                        <em>{plot}</em>
                    </p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>
                </section>
            </>
            }

        </div >
    )
}

export default MovieDetails