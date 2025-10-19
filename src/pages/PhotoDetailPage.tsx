import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Photo } from "@types";
import { getPhotoByGuid } from "@services/photoService";
import { Place } from "@mui/icons-material";

export default function PhotoDetailPage() {
  const { photoGuid } = useParams<{ photoGuid: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    if (!photoGuid) return;

    const fetchPhoto = async () => {
      setLoading(true);
      try {
        const data = await getPhotoByGuid(photoGuid);
        setPhoto(data);
      } catch (error) {
        console.error("Error fetching photo:", error);
        setPhoto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [photoGuid]);

  if (loading) {
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
          }}
        >
          {imgLoading && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </Box>
          )}
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
