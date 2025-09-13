import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../../../shared/api";
import type { IUser } from "../../../shared/interface/user.interface";

// const authKey: string = "authKey";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
}

interface IError {
  response: {
    data: {
      message: string;
    };
  };
}

interface IAuthR {
  token: string;
  data: IUser;
}

const authKey: string = "authKey";

export const useAuth = () => {
  const getAuthMe = () =>
    useQuery({
      queryKey: [authKey],
      queryFn: () => API.get("auth_me").then((res) => res.data),
      retry: 0,
    });

  const loginUser = useMutation<IAuthR, IError, ILogin>({
    mutationFn: (body) => API.post("auth", body).then((res) => res.data),
    retry: 0,
  });

  const registerUser = useMutation<IAuthR, IError, IRegister>({
    mutationFn: (body) => API.post("register", body).then((res) => res.data),
    retry: 0,
  });

  return { getAuthMe, loginUser, registerUser };
};
