import { Outlet } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
