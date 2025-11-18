import AdminMainPage from "@pages/AdminMainPage";
import NotFoundPage from "@pages/NotFoundPage";
import PhotoDetailPage from "@pages/PhotoDetailPage";
import PhotoFormPage from "@pages/PhotoFormPage";
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
      {
        path: "/admin-main",
        element: <AdminMainPage />,
      },
      {
        path: "/admin-main/upsert-photo",
        element: <PhotoFormPage key="create" />, // To avoid component still keeping old data from edit, we set a key.
      },
      {
        path: "/admin-main/manage/:photoGuid",
        element: <PhotoFormPage />,
      },
    ],
  },
]);
