import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CouponState {
  couponPercent: number | null;
}

const initialState: CouponState = {
  couponPercent: null,
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCouponPercent: (state, action) => {
      state.couponPercent = action.payload;
    },
  },
});

export const { setCouponPercent } = couponSlice.actions;

// select coupon from state
export const selectCoupon = (state: RootState) => state.coupon.couponPercent;

export default couponSlice.reducer;
