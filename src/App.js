import NavBar from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main";
import { useState } from "react";
import { tempMovieData } from "./Data/tempMovieData";
import { tempWatchedData } from "./Data/tempWatchedData";
import SearchBar from "./Components/SearchBar/SearchBar";
import NumResults from "./Components/NavBar/NumResults";
import Box from "./Components/Box/Box";
import MovieList from "./Components/MovieList/MovieList";
import WatchedSummary from "./Components/WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./Components/WatchedMoviesList/WatchedMoviesList";



export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <SearchBar />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
