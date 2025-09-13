import { jwtDecode } from "jwt-decode";
import type { IUser } from "../../../../shared/interface/user.interface";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../../shared/api";

export interface IUpdated {
  fname: string;
  lname: string;
  username: string;
  email: string;
}

export const useUser = () => {
  const getUser = () => {
    const token = localStorage.getItem("token");
    let user: IUser | null = null;
    if (token) user = jwtDecode<IUser>(token);
    return user;
  };

  const updateUser = useMutation<
    IUser,
    Error,
    { id: number | undefined; body: IUpdated }
  >({
    mutationFn: ({ id, body }) =>
      API.patch(`users/${id}`, body).then((res) => res.data),
  });

  const deleteUser = useMutation({
    mutationFn: (id: number) =>
      API.delete(`users/${id}`).then((res) => res.data),
  });

  return { getUser, updateUser, deleteUser };
};
