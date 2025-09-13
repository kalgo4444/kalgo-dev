import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { INews } from "../../../../shared/interface/news.interface";

export interface CounterState {
  editingItem: INews | null;
}

const initialState: CounterState = {
  editingItem: null,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setEditingItem: (state, action: PayloadAction<INews>) => {
      state.editingItem = action.payload;
    },
    removeEditingItem: (state) => {
      state.editingItem = null;
    },
  },
});

export const { setEditingItem, removeEditingItem } = newsSlice.actions;

export default newsSlice.reducer;
