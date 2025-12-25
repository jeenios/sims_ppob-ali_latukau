import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage, HomePage, TopupPage, TransactionPage, AkunPage, PaymentPage } from "@/pages";
import { MainLayout } from "@/layouts";
import ProtectedRoute from "@/providers/protectedroute";

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
    element: <ProtectedRoute />,
    children: [
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
            path: "/service/:service_code",
            element: <PaymentPage />,
          },
          {
            path: "/akun",
            element: <AkunPage />,
          },
        ],
      },
    ],
  },
]);
