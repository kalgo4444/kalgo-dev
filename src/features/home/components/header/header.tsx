import { memo, useCallback } from "react";
import { useAuth } from "../../../auth/services/useAuth";
import Logo from "../../../../shared/components/logo/logo";
import ActionBtn from "./components/ui/action-btn";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { getAuthMe } = useAuth();
  const { isError, isSuccess, isLoading } = getAuthMe();
  const nav = useNavigate();

  const handleLogin = useCallback(() => {
    nav("/login");
  }, []);

  const handleUser = useCallback(() => {
    nav("/user");
  }, []);

  return (
    <header className="w-[95%] block mx-auto sticky z-50 top-2 left-0 rounded-2xl bg-blue-500 h-20 shadow-md">
      <nav className="container-header flex items-center justify-between h-full">
        <Logo />
        <div>
          {!isLoading && (
            <>
              {isSuccess && (
                <ActionBtn
                  handleClick={handleUser}
                  active="active"
                  name="User"
                />
              )}
              {isError && (
                <ActionBtn
                  handleClick={handleLogin}
                  active="no-active"
                  name="Log In"
                />
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);
