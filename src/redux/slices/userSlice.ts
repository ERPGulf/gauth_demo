import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  user: {
    id: string;
    name: string;
    company_name: string;
    qid: string;
    email: string;
    mobile: string;
  };
}

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    company_name: "",
    qid: "",
    email: "",
    mobile: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMobile: (state, action) => {
      state.user.mobile = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// select user from state
export const selectUser = (state: RootState) => state.user.user;
// select mobile from state
export const selectMobile = (state: RootState) => state.user.user.mobile;
export default userSlice.reducer;
