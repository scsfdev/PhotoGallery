import { Box, CircularProgress, Container, Typography } from "@mui/material";
import PhotoList from "../components/PhotoList";
import type { Photo } from "@types";
import { useEffect, useState } from "react";
import { getPhotos } from "@services/photoService";
import FeaturedCarousel from "@components/FeaturedCarousel";

export default function PhotoMain() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [featurePhotos, setFeaturePhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const allPhotos = await getPhotos();
        setPhotos(allPhotos);
        setFeaturePhotos(allPhotos.slice(0, 5)); // Example: first 5 as featured
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container
        sx={{ mt: 3 }}
        style={{
          backgroundColor: "#d4d6dfff",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <FeaturedCarousel photos={featurePhotos} />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {photos.length > 0 ? (
          <PhotoList photos={photos} />
        ) : (
          <Typography variant="h6">No photos available</Typography>
        )}
      </Container>
    </>
  );
}
