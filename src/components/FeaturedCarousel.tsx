import { useFeaturePhotos } from "@hooks/useFeaturePhotos";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
  Box,
  CircularProgress,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4, // show 3 photos at once on desktop
    //partialvisibleGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function FeaturedCarousel() {
  // feature hook rely on primary hook
  const { featurePhotos, isPending: featurePhotosPending } =
    useFeaturePhotos(5);

  if (featurePhotosPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!featurePhotos || featurePhotos.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 3, textAlign: "center" }}>
        No photos available!
      </Typography>
    );
  }

  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={3000}
      arrows
      showDots
      slidesToSlide={1}
      //  centerMode // centers the slides nicely
      // containerClass={styles.carouselContainer} // optional for custom styling
      // itemClass={styles.carouselitempadding} // optional for padding adjustments
    >
      {featurePhotos.map((photo) => (
        <Link
          key={photo.photoGuid}
          style={{ textDecoration: "none" }}
          href={`/photos/${photo.photoGuid}`}
        >
          <Card sx={{ m: 1, width: 220, height: 150 }}>
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "70%",
                // aspectRatio: "1 / 1", // ✅ ensures square shape
                objectFit: "cover", // ✅ crop/cover instead of squishing
              }}
              image={photo.url}
              alt={photo.title}
            />
            <CardContent>
              <Typography variant="subtitle1" align="center">
                {photo.title}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Carousel>
  );
}
