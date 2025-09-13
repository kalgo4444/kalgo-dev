import "../style/auth.css";
import { memo } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../../../shared/components/error-message/error-message";
import { useAuth, type IRegister } from "../services/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

const schema = yup
  .object({
    fname: yup.string().required().min(3),
    lname: yup.string().required().min(3),
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  })
  .required();

const Register = () => {
  const { registerUser } = useAuth();
  const nav = useNavigate();
  const dis = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IRegister) => {
    registerUser.mutate(data, {
      onSuccess: () => {
        nav("/login");
        dis(setUser(data));
        reset();
      },
    });
  };

  const { error, isError, isPending } = registerUser;

  return (
    <section className="w-full h-screen flexCenter bg-liner">
      <form
        className="max-w-sm bg-white w-full p-3 rounded-md flex flex-col gap-y-4 shadow-2xs"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-4xl font-bold text-center dark:text-black">
          Register
        </h2>
        <div>
          <input
            placeholder="first name"
            className="h-12 w-full indent-3"
            {...register("fname")}
          />
          {errors.fname && <ErrorMessage>{errors.fname?.message}</ErrorMessage>}
        </div>

        <div>
          <input
            placeholder="last name"
            className="h-12 w-full indent-3"
            {...register("lname")}
          />
          {errors.lname && <ErrorMessage>{errors.lname?.message}</ErrorMessage>}
        </div>

        <div>
          <input
            placeholder="username"
            className="h-12 w-full indent-3"
            {...register("username")}
          />
          {errors.username && (
            <ErrorMessage>{errors.username?.message}</ErrorMessage>
          )}
        </div>

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
          Register
        </button>
        <div className="flex items-center justify-between gap-3">
          <div className="w-2/4 h-[1px] bg-neutral-200"></div>
          <div>or</div>
          <div className="w-2/4 h-[1px] bg-neutral-200"></div>
        </div>
        <button
          onClick={() => nav("/login")}
          disabled={isPending}
          type="button"
          className="w-full h-12 btn"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default memo(Register);
