import { memo, useEffect, useState, type FC } from "react";
import type { IUser } from "../../../../../shared/interface/user.interface";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ErrorMessage from "../../../../../shared/components/error-message/error-message";
import { useUser, type IUpdated } from "../../services/useUser";
import { useDispatch } from "react-redux";
import { removeToken } from "../../../../auth/store/authSlice";
import { useNavigate } from "react-router-dom";
import AcceptUpdate from "./accept-update";
import { toast } from "sonner";

const schema = yup
  .object({
    fname: yup.string().required().min(3),
    lname: yup.string().required().min(3),
    username: yup.string().required(),
    email: yup.string().required().email(),
  })
  .required();

interface UserFormProps {
  user: IUser | null;
}

const UserForm: FC<UserFormProps> = ({ user }) => {
  const [update, setUpdate] = useState<boolean>(false);
  const { updateUser } = useUser();
  const dis = useDispatch();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IUpdated>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IUpdated) => {
    updateUser.mutate(
      { id: user?.id, body: data },
      {
        onSuccess: () => {
          toast.success("User Info is Updated");
          dis(removeToken());
          nav("/login");
          reset();
        },
      }
    );
  };
  useEffect(() => {
    if (user) {
      setValue("fname", user?.fname);
      setValue("lname", user?.lname);
      setValue("username", user?.username);
      setValue("email", user?.email);
    }
  }, [user]);

  return (
    <>
      <AcceptUpdate update={update} setUpdate={setUpdate} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-2 md:p-5"
      >
        <h2 className="text-lg font-bold">Update User Info</h2>
        <div>
          <label>First Name</label>
          <input
            placeholder="first name"
            className="h-12 w-full indent-3"
            {...register("fname")}
          />
          {errors.fname && <ErrorMessage>{errors.fname?.message}</ErrorMessage>}
        </div>

        <div>
          <label>Last Name</label>
          <input
            placeholder="first name"
            className="h-12 w-full indent-3"
            {...register("lname")}
          />
          {errors.lname && <ErrorMessage>{errors.lname?.message}</ErrorMessage>}
        </div>

        <div>
          <label>Username</label>
          <input
            placeholder="first name"
            className="h-12 w-full indent-3"
            {...register("username")}
          />
          {errors.username && (
            <ErrorMessage>{errors.username?.message}</ErrorMessage>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            placeholder="first name"
            className="h-12 w-full indent-3"
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
        </div>
        <button type="submit" className="w-full h-12 btn">
          Update
        </button>
      </form>
    </>
  );
};

export default memo(UserForm);
