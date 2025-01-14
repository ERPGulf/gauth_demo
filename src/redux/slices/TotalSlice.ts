import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TotalState {
  total: number;
}

const initialState: TotalState = {
  total: 0,
};

export const totalSlice = createSlice({
  name: "total",
  initialState,
  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setTotal } = totalSlice.actions;

// select total from state
export const selectTotal = (state: RootState) => state.total.total;

export default totalSlice.reducer;
