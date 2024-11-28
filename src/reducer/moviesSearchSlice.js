import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, AUTH_TOKEN } from "../assets/constants";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ query, page }) => {
    try {
      const response = await fetch(
        `${API_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: AUTH_TOKEN,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      return {
        results: data.results,
        totalPages: data.total_pages,
        totalResults: data.total_results,
        page: data.page,
      };
    } catch (error) {
      return { error: error.message };
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    totalPages: 0,
    totalResults: 0,
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.movies = action.payload.results; // Reset movies for page 1
        } else {
          state.movies = [...state.movies, ...action.payload.results]; // Append results for subsequent pages
        }
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.page = action.payload.page;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
