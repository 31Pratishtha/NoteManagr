import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //children routes
      { index: true, element: <Public /> },
      { path: "login", element: <Login /> },

      //Dashboard Routes
      {
        path: "dash",
        element: <DashLayout />,
        children: [
          { index: true, element: <Welcome /> },
          { path: "notes", element: <NotesList /> },
          { path: "users", element: <UsersList /> },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
