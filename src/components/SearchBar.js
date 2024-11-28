import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  Pagination,
  CircularProgress,
  Typography,
  Container,
} from "@mui/material";
import { fetchMovies } from "../reducer/moviesSearchSlice";
import MovieCard from "./MovieCard";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState(localStorage.getItem("query") || "");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { movies, totalPages, loading, error } = useSelector(
    (state) => state.movies
  );

  // Debounced function for search query to reduce API calls
  const debouncedSearchQuery = useCallback(
    debounce(async (searchQuery, page) => {
      try {
        if (searchQuery.trim()) {
          await dispatch(fetchMovies({ query: searchQuery, page }));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }, 500),
    [dispatch]
  );

  // Debounced function for page change
  const debouncedSearchPage = useCallback(
    debounce(async (page) => {
      try {
        await dispatch(fetchMovies({ query, page }));
      } catch (error) {
        console.error("Error fetching movies for page:", error);
      }
    }, 500),
    [dispatch, query]
  );

  // Handle input change and trigger search
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery); // Update query state
    localStorage.setItem("query", newQuery); // Store query in localStorage
    // Trigger search based on input
    if (newQuery.trim()) {
      debouncedSearchQuery(newQuery, page);
    } else {
      dispatch(fetchMovies({ query: "", page: 1 })); // Reset search if input is empty or spaces
    }
  };

  // Handle page change and trigger search
  const handlePageChange = (event, value) => {
    setPage(value); // Update page state
    debouncedSearchPage(value); // Trigger search for page change
  };

  // Trigger search when query or page changes
  useEffect(() => {
    if (query.trim()) {
      debouncedSearchQuery(query, page);
    }
  }, [page, query, debouncedSearchQuery]);

  // Clean up debounced functions on component unmount
  useEffect(() => {
    return () => {
      debouncedSearchQuery.cancel();
      debouncedSearchPage.cancel();
    };
  }, [debouncedSearchQuery, debouncedSearchPage]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom mt={5}>
        Movie Search App
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <TextField
          type="search"
          label="Search Movies"
          variant="outlined"
          placeholder="Search movies name"
          value={query}
          onChange={handleInputChange}
          fullWidth
          sx={{
            marginBottom: 2,
            maxWidth: 400,
          }}
        />

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "0 auto" }} />
        ) : (
          <Box>
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
            {movies?.length === 0 ? (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", marginTop: 2 }}
              >
                No movies found.
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                {movies?.map((movie) => (
                  <Link
                    to={`/movie/${movie?.id}`}
                    key={movie.id}
                    sx={{ textDecoration: "none" }}
                  >
                    <MovieCard movie={movie} />
                  </Link>
                ))}
              </Box>
            )}
            {movies.length > 0 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              />
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default SearchBar;
