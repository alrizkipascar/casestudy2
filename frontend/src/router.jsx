import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayouts";
import MainPage from "./Pages/MainPage";
import Tasks from "./Pages/Tasks";
import ErrorPage from "./Pages/ErrorPage";
import SubTask from "./Pages/SubTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        // element: <Navigate to="/barang" />,
      },
      {
        path: "/tasks/:id",
        element: <Tasks />,
      },
      {
        path: "/tasks/:id/subtask/:subtask_id",
        element: <SubTask />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
