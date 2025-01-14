import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AmountState {
  amount: number;
}

const initialState: AmountState = {
  amount: 0,
};

export const amountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { setAmount } = amountSlice.actions;

// select total from state
export const selectAmount = (state: RootState) => state.amount.amount;

export default amountSlice.reducer;
