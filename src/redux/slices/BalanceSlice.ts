import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BalanceState {
  isBalance: number;
}

const initialState: BalanceState = {
  isBalance: 0,
};

export const BalanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.isBalance = action.payload;
    },
  },
});

export const { setBalance } = BalanceSlice.actions;

// select total from state
export const selectBalance = (state: RootState) => state.balance.isBalance;

export default BalanceSlice.reducer;
