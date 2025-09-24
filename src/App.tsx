import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    axios.get<Photo[]>("https://localhost:5001/api/Photos").then((response) => {
      setPhotos(response.data);
    });
  }, []);

  return (
    <>
      <Typography variant="h3">My Photo Gallery</Typography>
      <List>
        {photos.map((photo) => (
          <ListItem key={photo.photoGuid}>
            <ListItemText>{photo.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
