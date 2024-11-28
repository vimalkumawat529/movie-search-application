import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import { fetchMovieDetails } from "../reducer/movieDetailsSlice";
import { fetchMovieReviews } from "../reducer/reviewsSlice";
import Reviews from "./Reviews";
import { PLACEHOLDER_IMAGE } from "../assets/constants";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state for movie details
  const {
    movie,
    loading: movieLoading,
    error: movieError,
  } = useSelector((state) => state.movieDetails);

  // Redux state for reviews
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useSelector((state) => state.reviews);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchMovieDetails(id)); // Fetch movie details
        await dispatch(fetchMovieReviews(id)); // Fetch movie reviews
      } catch (error) {
        console.error("Error fetching data:", error); // Log error
      }
    };

    fetchData();
  }, [id, dispatch]);

  // Display a loading spinner if data is being fetched
  if (movieLoading || reviewsLoading)
    return (
      <CircularProgress
        sx={{ display: "block", margin: "0 auto", marginTop: "50px" }}
      />
    );

  // Handle errors
  if (movieError || reviewsError)
    return <div>Error: {movieError || reviewsError}</div>;

  // Handle case where movie data is unavailable
  if (!movie) return <div>Movie not found</div>;

  const hasPoster = movie?.poster_path !== null && movie?.poster_path !== "";

  // Navigate back to the search page
  const handleBackClick = () => navigate("/");

  return (
    <Box sx={{ padding: 3 }}>
      {/* Back Button */}
      <Button
        onClick={handleBackClick}
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
      >
        Back to Search
      </Button>

      {/* Movie Details Section */}
      <Grid
        container
        spacing={3}
        sx={{
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Movie Poster */}
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 2,
              height: { xs: 300, sm: 400, md: 450 },
            }}
            image={
              hasPoster
                ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                : PLACEHOLDER_IMAGE
            }
            alt={movie.title || "No Title Available"}
          />
        </Grid>

        {/* Movie Details */}
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Overview:</strong>{" "}
              {movie?.overview.length > 500
                ? `${movie?.overview.slice(0, 500)}...`
                : movie?.overview || "No description available."}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Release Date:</strong> {movie?.release_date || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Rating:</strong> {movie?.vote_average?.toFixed(2)} / 10
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Genres:</strong>{" "}
              {movie?.genres?.map((genre) => genre?.name)?.join(", ")}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: { xs: 0, md: 1 },
        }}
      >
        <Grid item xs={12}>
          {/* Centered Border */}
          <Box
            sx={{
              width: "100%",
              borderTop: "2px solid #ccc",
              margin: "0 auto",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              marginTop: 2,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Reviews
          </Typography>
          <Reviews reviews={reviews} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieDetailsPage;
