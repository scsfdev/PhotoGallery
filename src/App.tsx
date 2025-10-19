import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import PhotoMainPage from "./pages/PhotoMainPage";

function App() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Routes>
        {/* Main gallery page */}
        <Route path="/" element={<PhotoMainPage />} />

        {/* Photo detail page */}
        <Route path="/photo/:photoGuid" element={<PhotoDetailPage />} />

        {/* Optional: catch-all 404 page */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
