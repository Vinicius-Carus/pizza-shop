import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/app/dashboard";
import SignIn from "./pages/auth/signin";
import AppLayout from "./pages/_layouts/app";
import AuthLayout from "./pages/_layouts/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/signin", element: <SignIn /> }],
  },
]);
