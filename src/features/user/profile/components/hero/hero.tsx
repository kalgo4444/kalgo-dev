import { memo } from "react";
import UserInfo from "../user-info/user-info";
import UserForm from "../user-form/user-form";
import UserBtn from "../user-action/user-btn";
import { useAuth } from "../../../../auth/services/useAuth";

const styleWrapper: string =
  "w-full md:w-1/2 bg-neutral-50 dark:bg-neutral-900 rounded-2xl";

const Hero = () => {
  const { getAuthMe } = useAuth();
  const { data: user } = getAuthMe();

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className={`${styleWrapper} p-2 md:p-5`}>
        <UserInfo user={user} />
        <UserBtn user={user} />
      </div>
      <div className={`${styleWrapper} relative`}>
        <UserForm user={user} />
      </div>
    </div>
  );
};

export default memo(Hero);
