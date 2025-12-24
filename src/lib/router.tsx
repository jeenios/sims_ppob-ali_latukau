import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage, HomePage } from "@/pages";
import { MainLayout } from "@/layouts";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/homepage",
        element: <HomePage />,
      },
      // Halaman lain yang butuh Navbar bisa ditambahkan di sini
    ],
  },
]);
