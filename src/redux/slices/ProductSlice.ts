import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { product } from "@/types/product-types";

interface ProductState {
  product: product;
}

const initialState: ProductState = {
  product: {
    product: "",
    description: "",
    amount: 0,
    amountType: "",
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;

// select product from state
export const selectProduct = (state: RootState) => state.product.product;

export default productSlice.reducer;
