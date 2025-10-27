import { Container, Grid } from "@mui/material";
import PhotoList from "../components/PhotoList";
import FeaturedCarousel from "@components/FeaturedCarousel";
import CategoryList from "@components/CategoryList";

export default function PhotoMain() {
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
        <FeaturedCarousel />
      </Container>

      {/* <Container maxWidth="xl" sx={{ mt: 3 }}>
        <PhotoList />
      </Container> */}
      <Grid container spacing={3} sx={{ mt: 2, ml: 3 }}>
        <Grid size={10}>
          <PhotoList />
        </Grid>
        <Grid size={2}>
          <CategoryList />
        </Grid>
      </Grid>
    </>
  );
}
