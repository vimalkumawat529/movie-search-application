import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { PLACEHOLDER_IMAGE } from "../assets/constants";

const MovieCard = ({ movie }) => {
  const hasPoster = movie?.poster_path !== null && movie?.poster_path !== "";
  const title = movie?.title || "No Title Available";
  const isLongTitle = title?.length > 20; // Check if the title is too long
  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Scale on hover
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        sx={{
          width: 300,
          height: 500,
          margin: 2,
          boxShadow: 3,
          transition: "transform 0.3s ease",
        }}
      >
        <CardMedia
          component="img"
          height="350"
          sx={{
            objectFit: "fill",
          }}
          image={
            hasPoster
              ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
              : PLACEHOLDER_IMAGE
          }
          alt={movie.title || "No Title Available"}
        />

        <CardContent>
          {isLongTitle ? (
            <Tooltip title={title} arrow>
              <Typography variant="h6" component="div" noWrap>
                {`${title?.substring(0, 20)}...`}
              </Typography>
            </Tooltip>
          ) : (
            <Typography variant="h6" component="div" noWrap>
              {title}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            {movie?.release_date
              ? `Release Date: ${movie?.release_date}`
              : "Release Date: N/A"}
          </Typography>

          {/* {/* Display Overview */}
          <Typography variant="body2" color="text.secondary">
            {movie.overview
              ? movie?.overview?.length > 100
                ? `${movie?.overview?.substring(0, 100)}...`
                : movie?.overview
              : "No description available."}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MovieCard;
