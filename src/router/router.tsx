import { createBrowserRouter, RouteObject } from "react-router-dom";
import routes from "./routerConfig";

import RootLayout from "@/layouts/RootLayout/RootLayout";
import Home from "@/pages/Home/Home";
import SignIn from "@/pages/SignIn/SignIn";
import SignUp from "@/pages/SignUp/SignUp";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import MyAppointments from "@/pages/MyAppointments/MyAppointments";
import DepartmentList from "@/pages/DepartmentList/DepartmentList";
import MyProfile from "@/pages/MyProfile/MyProfile";
import MakeNewAppointment from "@/pages/MakeNewAppointment/MakeNewAppointment";

const routeLayout: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.myAppointments,
        element: <MyAppointments />,
      },
      {
        path: routes.deparmentList,
        element: <DepartmentList />,
      },
      {
        path: routes.makeNewAppointment,
        element: <MakeNewAppointment />,
      },
      {
        path: routes.myProfile,
        element: <MyProfile />,
      }
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
