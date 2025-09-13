import { memo } from "react";
import Logo from "../../../../shared/components/logo/logo";
import ActionBtn from "../../../home/components/header/components/ui/action-btn";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../auth/store/authSlice";

const UserHeader = () => {
  const dis = useDispatch();
  const nav = useNavigate();
  const handleLogoutClick = (): void => {
    dis(removeToken());
    nav("/");
  };
  return (
    <header className="w-full h-14 bg-blue-500">
      <nav className="container-header flex items-center justify-between h-full">
        <Logo />
        <ActionBtn
          handleClick={handleLogoutClick}
          active="log-out"
          name="Log Out"
        />
      </nav>
    </header>
  );
};

export default memo(UserHeader);
