import { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserHeader from "./components/user-header";
import { useAuth } from "../../auth/services/useAuth";
import { useDispatch } from "react-redux";
import { removeToken } from "../../auth/store/authSlice";
import ThemeBtn from "../../../shared/components/theme-btn/theme-btn";
import NavlinkBar from "./components/navlink-bar/navlink-bar";

const UserLayout = () => {
  const { getAuthMe } = useAuth();
  const { isError } = getAuthMe();
  const dis = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (isError) {
      dis(removeToken());
      nav("/login");
    }
  }, [isError]);

  return (
    <>
      <UserHeader />
      <main>
        <Outlet />
      </main>
      <ThemeBtn />
      <NavlinkBar />
    </>
  );
};

export default memo(UserLayout);
