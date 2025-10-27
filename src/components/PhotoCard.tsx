import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  Typography,
  CardActions,
  CardMedia,
  Badge,
  IconButton,
  Box,
  Skeleton,
} from "@mui/material";
import type { Photo } from "@types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  photo: Photo;
};

export default function PhotoCard({ photo }: Props) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(photo.likesCount);
  // const [imgLoading, setImgLoading] = useState(true); // image download loading
  const [imgLoaded, setImgLoaded] = useState(false); // track if image finished loading
  const navigate = useNavigate();

  const handleClickImage = () => {
    navigate(`/photos/${photo.photoGuid}`); // SPA navigation
  };

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card
      sx={{
        aspectRatio: "1 / 1",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
        position: "relative",
      }}
    >
      {/* Clickable image */}
      <Box
        onClick={handleClickImage}
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {/* Spinner overlay
        {imgLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )} */}

        {!imgLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave" // nice loading wave effect
          />
        )}

        <CardMedia
          component="img"
          image={photo.url}
          alt={photo.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderTopLeftRadius: 12, // optional: match card rounding
            borderTopRightRadius: 12, // optional: match card rounding
            display: imgLoaded ? "block" : "none", // hide until loaded
            transition: "opacity 0.3s",
          }}
          onLoad={() => setImgLoaded(true)} // trigger when image finishes loading
        />
      </Box>

      {/* Card footer */}
      <CardActions sx={{ p: 1, justifyContent: "space-between" }}>
        <Typography variant="body2" noWrap>
          {photo.title}
        </Typography>

        <Badge
          badgeContent={count}
          color="error"
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <IconButton onClick={handleLike}>
            {liked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Badge>
      </CardActions>
    </Card>
  );
}
