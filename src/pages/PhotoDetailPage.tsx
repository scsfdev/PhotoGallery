import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Place } from "@mui/icons-material";
import { usePhotos } from "@hooks/usePhotos";

export default function PhotoDetailPage() {
  const { photoGuid } = useParams<{ photoGuid: string }>();

  const { photo, isLoadingPhoto } = usePhotos(photoGuid!);
  const [imgLoading, setImgLoading] = useState(true);

  if (isLoadingPhoto) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!photo) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 10 }}>
        Photo not found
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      {/* Two-column layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // stack on mobile, row on desktop
          gap: 4,
        }}
      >
        {/* Left: Image */}
        <Box
          sx={{
            display: "flex",
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            minHeight: { xs: 300, md: 600 },
            maxHeight: 600,
          }}
        >
          {/* Skeleton loading area */}
          {imgLoading && (
            <Skeleton
              variant="rectangular"
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                borderRadius: 2,
              }}
              animation="wave" // nice loading wave effect
            />
          )}

          {/* The Image area */}
          <Box
            component="img"
            src={photo.url}
            alt={photo.title}
            sx={{
              width: "100%",
              maxHeight: 600,
              objectFit: "contain",
              borderRadius: 2,
              opacity: imgLoading ? 0 : 1, // hide until loaded
              transition: "opacity 0.3s ease-in-out",
            }}
            onLoad={() => setImgLoading(false)}
          />
        </Box>

        {/* Right: Metadata */}
        <Box sx={{ flex: 1, overflowY: "auto", maxHeight: "100vh" }}>
          <Stack direction="column" spacing={2}>
            <Container />
            <Typography variant="h5" fontWeight="bold">
              {photo.title}
            </Typography>
            <Typography variant="subtitle1">{photo.description}</Typography>
            <Divider />
            {/* <Typography variant="body2" color="text.secondary">
              <Place fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }}/>{photo.location}, {photo.country}
            </Typography> */}
            <Box display="flex" alignItems="center">
              <Place fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {photo.location}, {photo.country}
              </Typography>
            </Box>
            {/* <Typography variant="body2">Categories: {photo.categories?.join(", ")}</Typography> */}
            <Typography variant="body2" color="text.secondary">
              ❤️ {photo.likesCount}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
