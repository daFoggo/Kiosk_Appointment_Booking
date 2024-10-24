import { createBrowserRouter, RouteObject } from "react-router-dom";
import routes from "./routerConfig";

import RootLayout from "@/layouts/RootLayout/RootLayout";
import Home from "@/pages/Home/Home";
import SignIn from "@/pages/SignIn/SignIn";
import SignUp from "@/pages/SignUp/SignUp";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";

const routeLayout: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: routes.signIn,
        element: <SignIn />,
      },
      {
        path: routes.signUp,
        element: <SignUp />,
      },
    ],
  },
];

const router = createBrowserRouter(routeLayout);

export default router;
