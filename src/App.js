import NavBar from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main";
import { useEffect, useState } from "react";
import { tempMovieData } from "./Data/tempMovieData";
import { tempWatchedData } from "./Data/tempWatchedData";
import SearchBar from "./Components/SearchBar/SearchBar";
import NumResults from "./Components/NavBar/NumResults";
import Box from "./Components/Box/Box";
import MovieList from "./Components/MovieList/MovieList";
import WatchedSummary from "./Components/WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./Components/WatchedMoviesList/WatchedMoviesList";


const KEY = '812f6a2'

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  console.log("Movies", movies)

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`).then(
      res => res.json()
    ).then(data => setMovies(data.Search))
}, [])

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
