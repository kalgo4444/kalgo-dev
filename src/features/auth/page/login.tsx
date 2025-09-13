import "../style/auth.css";
import { memo, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ErrorMessage from "../../../shared/components/error-message/error-message";
import { useAuth, type ILogin } from "../services/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/stote";
import { removeUser, setToken } from "../store/authSlice";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  })
  .required();

const Login = () => {
  const { loginUser } = useAuth();
  const nav = useNavigate();
  const dis = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: ILogin) => {
    loginUser.mutate(data, {
      onSuccess: (res) => {
        dis(setToken(res.token));
        dis(removeUser());
        nav("/");
        reset();
      },
    });
  };

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("password", user.password);
    }
  }, [user]);

  const { error, isError, isPending } = loginUser;

  return (
    <section className="w-full h-screen flexCenter bg-liner">
      <form
        className="max-w-sm bg-white w-full p-3 rounded-md flex flex-col gap-y-4 shadow-2xs"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-4xl font-bold text-center dark:text-black">
          Login
        </h2>
        <div>
          <input
            placeholder="email"
            className="h-12 w-full indent-3"
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
        </div>
        <div>
          <input
            placeholder="password"
            className="h-12 w-full indent-3"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          )}
        </div>

        {isError && (
          <ErrorMessage>{error?.response?.data?.message}</ErrorMessage>
        )}

        <button disabled={isPending} type="submit" className="w-full h-12 btn">
          Login
        </button>
        <div className="flex items-center justify-between gap-3">
          <div className="w-2/4 h-[1px] bg-neutral-200"></div>
          <div>or</div>
          <div className="w-2/4 h-[1px] bg-neutral-200"></div>
        </div>
        <button
          onClick={() => nav("/register")}
          disabled={isPending}
          type="button"
          className="w-full h-12 btn"
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default memo(Login);
