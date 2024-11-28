import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, AUTH_TOKEN } from "../assets/constants";

// Fetch reviews based on movie ID
export const fetchMovieReviews = createAsyncThunk(
  "reviews/fetchMovieReviews",
  async (movieId) => {
    const url = `${API_URL}/movie/${movieId}/reviews?language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: AUTH_TOKEN,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      return data.results; // Return the reviews data
    } catch (error) {
      return { error: error.message };
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload; // Save reviews in state
      })
      .addCase(fetchMovieReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error if the request fails
      });
  },
});

export default reviewsSlice.reducer;
