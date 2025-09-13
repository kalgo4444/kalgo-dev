import { lazy, memo } from "react";
import { useRoutes } from "react-router-dom";

const MainLayout = lazy(() => import("../layout/MainLayout"));
const Home = lazy(() => import("../features/home/page/home"));
const NewsPage = lazy(() => import("../features/news/page/news-page"));

const Auth = lazy(() => import("../features/auth/page/auth"));
const Login = lazy(() => import("../features/auth/page/login"));
const Register = lazy(() => import("../features/auth/page/register"));

const UserLayout = lazy(
  () => import("../features/user/user-layout/user-layout")
);
const UserMainPage = lazy(() => import("../features/user/main/page/main"));
const UserProfilePage = lazy(
  () => import("../features/user/profile/page/profile")
);
const UserNewsCreatePage = lazy(
  () => import("../features/user/form-news/page/form-news")
);

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/news/:slug",
          element: <NewsPage />,
        },
      ],
    },
    {
      path: "/user",
      element: <Auth />,
      children: [
        {
          path: "",
          element: <UserLayout />,
          children: [
            {
              index: true,
              element: <UserMainPage />,
            },
            {
              path: "profile",
              element: <UserProfilePage />,
            },
            {
              path: "create-news",
              element: <UserNewsCreatePage />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
};

export default memo(AppRoutes);
