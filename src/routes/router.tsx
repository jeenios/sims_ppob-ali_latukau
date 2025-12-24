import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage, HomePage, TopupPage, TransactionPage, AkunPage } from "@/pages";
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
      {
        path: "/topup",
        element: <TopupPage />,
      },
      {
        path: "/transaction",
        element: <TransactionPage />,
      },
      {
        path: "/akun",
        element: <AkunPage />,
      },
    ],
  },
]);
