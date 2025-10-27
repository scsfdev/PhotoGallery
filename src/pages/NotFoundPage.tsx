import { Container } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </Container>
  );
}
