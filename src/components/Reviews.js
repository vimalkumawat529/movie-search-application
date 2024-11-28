import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: {
            xs: "center",
            sm: "left",
          },
        }}
      >
        No reviews available.
      </Typography>
    );
  }

  return (
    <List>
      {reviews?.map((review) => (
        <ListItem key={review?.id} sx={{ alignItems: "flex-start" }}>
          <ListItemAvatar sx={{ marginTop: "10px" }}>
            <Avatar
              src={review?.author_details.avatar_path}
              alt={review?.author}
            >
              {review.author[0].toUpperCase()}{" "}
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={review.author}
            secondary={
              review?.content?.length > 500
                ? `${review?.content.slice(0, 500)}...`
                : review?.content
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Reviews;
