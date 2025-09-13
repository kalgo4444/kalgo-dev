import { LogIn, LogOut, User } from "lucide-react";
import { memo, type FC } from "react";

interface Props {
  name: string;
  active: "no-active" | "active" | "log-out";
  handleClick: () => void;
}

const ActionBtn: FC<Props> = ({ name, active, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="btn flex items-center gap-3 px-2 sm:px-3 py-1"
    >
      {active === "active" ? (
        <User />
      ) : active === "no-active" ? (
        <LogIn />
      ) : active === "log-out" ? (
        <LogOut />
      ) : (
        ""
      )}
      <span>{name}</span>
    </button>
  );
};

export default memo(ActionBtn);
