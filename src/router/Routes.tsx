import NotFoundPage from "@pages/NotFoundPage";
import PhotoDetailPage from "@pages/PhotoDetailPage";
import PhotoMainPage from "@pages/PhotoMainPage";
import App from "App";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <PhotoMainPage />,
      },
      {
        path: "/photos/:photoGuid",
        element: <PhotoDetailPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
