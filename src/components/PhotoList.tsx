import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import PhotoCard from "./PhotoCard";
import { usePhotos } from "@hooks/usePhotos";

export default function PhotoList() {
  // primary fetching hook
  const { photos, isPending: allPhotosPending } = usePhotos();

  if (allPhotosPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 3, textAlign: "center" }}>
        No photos available!
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid key={photo.photoGuid} size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
          <PhotoCard key={photo.photoGuid} photo={photo} />
        </Grid>
      ))}
    </Grid>
  );
}
