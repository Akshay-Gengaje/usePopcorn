import { useEffect, useState } from "react";

const KEY = "812f6a2";
export function useFetch(query  ) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    console.log("Query", query)
    useEffect(() => {
        if (query.length < 3) {
            setMovies([]);
            setError("");
            return
        }
        fetchMovies();
        return () => controller.abort();
    }, [query]);

    const controller = new AbortController();
    const fetchMovies = async () => {
        try {

            setIsLoading(true);
            setError("")
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal }
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

    return { movies, isLoading, error }
}