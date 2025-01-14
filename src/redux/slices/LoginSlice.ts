import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface LoginState {
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  isLoggedIn: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = loginSlice.actions;

// select login from state
export const selectLogin = (state: RootState) => state.login.isLoggedIn;

export default loginSlice.reducer;
