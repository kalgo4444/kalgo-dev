import { memo } from "react";
import { useUser } from "../../services/useUser";
import type { IUser } from "../../../../../shared/interface/user.interface";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../../auth/store/authSlice";
import { toast } from "sonner";

const UserBtn = ({ user }: { user: IUser | null }) => {
  const { deleteUser } = useUser();
  const dis = useDispatch();
  const nav = useNavigate();

  const handleCLick = (id: number | undefined): void => {
    deleteUser.mutate(Number(id), {
      onSuccess: () => {
        dis(removeToken());
        nav("/register");
        toast.message("Account is Deleted");
      },
    });
  };
  return (
    <button
      onClick={() => handleCLick(user?.id)}
      className="btn px-3 py-1 max-w-xs w-full my-5 block mx-auto"
    >
      Delete
    </button>
  );
};

export default memo(UserBtn);
