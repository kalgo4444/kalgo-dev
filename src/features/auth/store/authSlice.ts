import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IRegister } from "../services/useAuth";

export interface CounterState {
  token: string | null;
  user: IRegister | null;
}

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const initialState: CounterState = {
  token: token ? token : null,
  user: user ? JSON.parse(user) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action: PayloadAction<IRegister>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, removeToken, setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
