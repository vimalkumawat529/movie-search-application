import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../reducer/moviesSearchSlice";
import movieDetailsReducer from "../reducer/movieDetailsSlice";
import reviewsReducer from "../reducer/reviewsSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    reviews: reviewsReducer,
  },
});

export default store;
