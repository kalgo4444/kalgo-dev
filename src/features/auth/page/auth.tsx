import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate replace to={"/login"} />;
};

export default memo(Auth);
