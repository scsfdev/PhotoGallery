import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";
import type { Photo } from "@types";
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

export default function FeaturedCarousel({ photos }: { photos: Photo[] }) {
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
      {photos.map((photo) => (
        <Link
          key={photo.photoGuid}
          style={{ textDecoration: "none" }}
          href={`/photos/${photo.photoGuid}`}
        >
          <Card sx={{ m: 1, width: 220, height: 150}}>
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
