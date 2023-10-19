import NavBar from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main";
import { useEffect, useState } from "react";
import { tempWatchedData } from "./Data/tempWatchedData";
import SearchBar from "./Components/SearchBar/SearchBar";
import NumResults from "./Components/NavBar/NumResults";
import Box from "./Components/Box/Box";
import MovieList from "./Components/MovieList/MovieList";
import WatchedSummary from "./Components/WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./Components/WatchedMoviesList/WatchedMoviesList";
import Loader from "./Components/Loader/Loader";
import ErrorMessage from "./Components/ErrorMessage/ErrorMessage";
import MovieDetails from "./Components/MovieDetails/MovieDetails";

const KEY = "812f6a2";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)


  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError("")
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );
      if (!res.ok) {
        throw new Error("Something went wrong with fetching movies");
      }
      const data = await res.json();

      if (data.Response === "False") {
        throw new Error("Movie Not Found");
      }
      setMovies(data.Search);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return
    }
    fetchMovies();
    return () => console.log("Clean Up");
  }, [query]);

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} selectedId={selectedId} setSelectedId={setSelectedId} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? <MovieDetails selectedId={selectedId} setSelectedId={setSelectedId} />
            : <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} setWatched={setWatched} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}
