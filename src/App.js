import NavBar from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main";
import { useState } from "react";
import SearchBar from "./Components/SearchBar/SearchBar";
import NumResults from "./Components/NavBar/NumResults";
import Box from "./Components/Box/Box";
import MovieList from "./Components/MovieList/MovieList";
import WatchedSummary from "./Components/WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./Components/WatchedMoviesList/WatchedMoviesList";
import Loader from "./Components/Loader/Loader";
import ErrorMessage from "./Components/ErrorMessage/ErrorMessage";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import { useFetch } from "./hooks/useFetch";
import { useLocalStorage } from "./hooks/useLocalStorage";


export default function App() {
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)
  const { movies, isLoading, error } = useFetch(query);

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>

          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} selectedId={selectedId} setSelectedId={setSelectedId} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? <MovieDetails selectedId={selectedId} setSelectedId={setSelectedId} onAddWatched={setWatched} watched={watched} />
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
