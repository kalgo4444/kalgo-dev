import { memo, type FC } from "react";
import type { IUser } from "../../../../../shared/interface/user.interface";

interface UserInfoProps {
  user: IUser | null;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-5">
      <div className="size-20 md:size-28 bg-blue-500 text-white text-6xl font-extrabold rounded-full gridCenter">
        {user?.fname.slice(0, 1)}
      </div>
      <div className="flex flex-col gap-0.">
        <h1 className="text-base md:text-2xl font-semibold">
          {user?.fname} {user?.lname}
        </h1>
        <b>{user?.username}</b>
        <small>{user?.email}</small>
      </div>
    </div>
  );
};

export default memo(UserInfo);
