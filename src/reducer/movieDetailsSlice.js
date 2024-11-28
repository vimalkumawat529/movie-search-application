import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, AUTH_TOKEN } from "../assets/constants";

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId) => {
    try {
      const response = await fetch(
        `${API_URL}/movie/${movieId}?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: AUTH_TOKEN,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    movie: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieDetailsSlice.reducer;
