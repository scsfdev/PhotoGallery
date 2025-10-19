import { Grid } from "@mui/material";
import PhotoCard from "./PhotoCard";
import type { Photo } from "@types";


type Props = {
  photos: Photo[];
};

export default function PhotoList({ photos }: Props) {
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
